import jwt from 'jsonwebtoken'

import config from '../config'

const {
    jwt: { accessSecret = '' },
} = config

import { instanceAuthService } from '@api/Auth/AuthService'

import { HttpError } from 'routing-controllers'

import { AuthReq } from '@customTypes/request'

import { NextFunction, Response } from 'express'

import { ExpressMiddlewareInterface } from 'routing-controllers'

export class AuthMiddleware implements ExpressMiddlewareInterface {
    async use(req: AuthReq, _: Response, next: NextFunction) {
        try {
            const { authorization = '' } = req.headers

            const [bearer, token] = authorization.split(' ')

            if (bearer !== 'Bearer') {
                throw new HttpError(401, 'Unauthorized')
            }
            const { id } = jwt.verify(token, accessSecret) as { id: string }
            const user = await instanceAuthService.findById(Number(id))
            if (!user || !user.accessToken) {
                throw new HttpError(401, 'Unauthorized')
            }

            req.user = user
            next()
        } catch (error) {
            next(error)
        }
    }
}
