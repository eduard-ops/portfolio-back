import { AuthMiddleware } from '@middlewares'
import { JsonController, Delete, UseBefore, Req } from 'routing-controllers'

import { instanceUserService } from './UserService'

import { AuthReq } from '@customTypes/request'

@JsonController('/user')
export class UserController {
    private service = instanceUserService

    @UseBefore(AuthMiddleware)
    @Delete('/')
    async deleteUser(@Req() req: AuthReq) {
        const { id } = req.user

        await this.service.deleteUser(id)

        return { message: 'User deleted' }
    }
}
