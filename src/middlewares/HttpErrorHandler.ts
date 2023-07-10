import {
    ExpressErrorMiddlewareInterface,
    HttpError,
    Middleware,
} from 'routing-controllers'

import { Request, Response } from 'express'

@Middleware({ type: 'after' })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: HttpError, _: Request, response: Response) {
        const { httpCode = 500, message = 'Server error' } = error
        if (!response.headersSent) {
            response.status(httpCode).json({ message })
        }
    }
}
