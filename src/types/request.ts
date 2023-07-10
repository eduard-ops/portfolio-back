import { User } from '@api/User/User.entity'

import { Request } from 'express'

export interface AuthReq extends Request {
    user: User
}

export interface IFileReq extends Request {
    file: Express.Multer.File
}
