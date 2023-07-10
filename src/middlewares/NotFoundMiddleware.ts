import { Request, Response } from 'express'

import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'

@Middleware({ type: 'after' })
export class NotFoundMiddleware implements ExpressMiddlewareInterface {
    use(_req: Request, res: Response) {
        res.status(404).json({ message: 'Not found' })
    }
}
