import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import {
    Body,
    JsonController,
    Post,
    UseBefore,
    HttpCode,
    HttpError,
    Get,
    Req,
} from 'routing-controllers'

import { IAuth } from './Auth.dto'

import { instanceAuthService } from './AuthService'

import { ValidationSchema, AuthMiddleware } from '@middlewares'

import { AuthLogin, AuthRegister } from './Auth.schema'

import config from '@config'

import { AuthReq } from '@customTypes/request'

const {
    jwt: { accessSecret = '' },
} = config

@JsonController('/auth')
export default class AuthController {
    private service = instanceAuthService

    @Post('/signup')
    @HttpCode(201)
    @UseBefore(ValidationSchema.validation(AuthRegister))
    async signup(@Body() body: IAuth) {
        const { name, email, password } = body
        const find = await this.service.findByEmail(email)

        if (find?.isDeleted) {
            throw new HttpError(
                401,
                `User with this email has deleted his account`
            )
        }

        if (find) {
            throw new HttpError(409, `Email address is already registered`)
        }

        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

        const user: IAuth = { ...body, password: hashPassword }
        await this.service.createUser(user)

        return { name, email }
    }

    @Post('/signin')
    @UseBefore(ValidationSchema.validation(AuthLogin))
    async signin(@Body() body: IAuth) {
        const { email, password } = body

        const user = await this.service.findByEmail(email)

        const passCompare = bcrypt.compareSync(password, user?.password ?? '')

        if (!user || !passCompare) {
            throw new HttpError(
                401,
                `Email address or password doesn't correct`
            )
        }

        const { isDeleted } = user

        if (isDeleted) {
            throw new HttpError(
                401,
                `User with this email has deleted his account`
            )
        }

        const payload = {
            id: String(user.id),
        }

        const accessToken = jwt.sign(payload, accessSecret, {
            expiresIn: '2h',
        })

        await this.service.setTokenUser(user.id, accessToken)

        return {
            data: { accessToken },
        }
    }

    @Get('/signout')
    @HttpCode(204)
    @UseBefore(AuthMiddleware)
    async signout(@Req() req: AuthReq) {
        const { id } = req.user
        await this.service.unsetToken(+id)
        return {}
    }
}
