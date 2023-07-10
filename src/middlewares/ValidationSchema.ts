import { NextFunction, Response } from 'express'

import { plainToClass, ClassConstructor } from 'class-transformer'

import { validate } from 'class-validator'

import { HttpError } from 'routing-controllers'

export class ValidationSchema {
    static validation(schema: ClassConstructor<object>) {
        return async (req: Request, _res: Response, next: NextFunction) => {
            const registrationRequest = plainToClass(schema, req.body)
            const errors = await validate(registrationRequest, {
                forbidNonWhitelisted: true,
                whitelist: true,
            })

            if (errors.length > 0) {
                const errorMessages = errors.map((error) => {
                    const constraints = Object.values(
                        error.constraints || {}
                    ).join(', ')
                    return `${constraints}`
                })

                const err = new HttpError(400, errorMessages[0])

                next(err)
            }

            next()
        }
    }
}
