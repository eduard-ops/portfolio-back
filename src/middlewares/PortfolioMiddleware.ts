import { AuthReq } from '@customTypes/request'

import { Response, NextFunction } from 'express'

import { instancePortfolioService } from '@api/Portfolio/PortfolioService'

import { instanceImageService } from '@api/Image/ImageService'

import { ExpressMiddlewareInterface } from 'routing-controllers'

import { HttpError } from 'routing-controllers'

export class PortfolioMiddleware implements ExpressMiddlewareInterface {
    async use(req: AuthReq, _res: Response, next: NextFunction) {
        try {
            const { id } = req.user

            const { portfolio_id, photoId = null } = req.params

            const check = await instancePortfolioService.findPotfolio(
                +portfolio_id,
                id
            )

            if (!check) {
                throw new HttpError(
                    404,
                    'Potfolio not found or does not belong to you'
                )
            }

            if (photoId) {
                const data = await instanceImageService.findImage(+photoId)

                data?.portfolio.id !== check.id &&
                    (() => {
                        throw new HttpError(
                            404,
                            `Image not found or does not belong to you`
                        )
                    })()
            }
        } catch (error) {
            next(error)
        }

        next()
    }
}
