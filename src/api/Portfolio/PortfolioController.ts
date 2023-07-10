import {
    Body,
    JsonController,
    Post,
    Req,
    HttpCode,
    Param,
    Delete,
    UseBefore,
    HttpError,
} from 'routing-controllers'

import { upload } from '@services/multer'

import { IPortfolio } from './Portfolio.dto'

import { Image } from '../Image/Image.dto'

import { ImageCreate } from '../Image/Image.schema'

import { IFileReq } from '@customTypes/request'

import {
    ValidationSchema,
    AuthMiddleware,
    PortfolioMiddleware,
} from '@middlewares'

import { PortfolioCreate } from './Portfolio.schema'

import { instancePortfolioService } from './PortfolioService'

import { AuthReq } from '@customTypes/request'

import { instanceImageService } from '@api/Image/ImageService'

import { bufferToDataURI } from '@helpers'

import cloudinary from '@services/cloudinary'

@JsonController('/portfolio')
export default class PortfolioController {
    private potfolioService = instancePortfolioService
    private imageService = instanceImageService
    @Post('/')
    @HttpCode(201)
    @UseBefore(ValidationSchema.validation(PortfolioCreate))
    @UseBefore(AuthMiddleware)
    async createPortfolio(@Req() req: AuthReq, @Body() body: IPortfolio) {
        const { id } = req.user

        const user = { ...body, user: id }

        const data = await this.potfolioService.createPortfolio(user)

        return { data }
    }

    @Delete('/:portfolio_id')
    @UseBefore(PortfolioMiddleware)
    @UseBefore(AuthMiddleware)
    async deletePortfolio(
        @Req() _req: AuthReq,
        @Param('portfolio_id') portfolio_id: string
    ) {
        const numId = Number(portfolio_id)

        const data = await this.imageService.findImagesByPortfolioId(numId)
        if (data.length > 0) {
            const deleteImages = data.map((item) => item.cloudinary_id)

            await cloudinary.api.delete_resources(deleteImages)
        }
        await this.potfolioService.deletePortfolio(numId)

        return { message: 'Portfolio deleted' }
    }

    @Post('/:portfolio_id/image')
    @UseBefore(PortfolioMiddleware)
    @UseBefore(ValidationSchema.validation(ImageCreate))
    @UseBefore(upload.single('file'))
    @UseBefore(AuthMiddleware)
    async createImage(
        @Req() req: IFileReq,
        @Param('portfolio_id') portfolio_id: string,
        @Body() body: Image
    ) {
        if (!req.file) {
            throw new HttpError(
                400,
                'No file received or invalid file type or the file limit was exceeded up to 5 Mb'
            )
        }

        const { file } = req
        const fileFormat = file.mimetype.split('/')[1]
        const { base64 = '' } = bufferToDataURI(fileFormat, file.buffer)
        const { url, public_id } = await cloudinary.uploader.upload(
            `data:file/${fileFormat};base64,${base64}`,
            { folder: 'portfolio-images' }
        )

        const image = {
            ...body,
            url,
            cloudinary_id: public_id,
            portfolio: +portfolio_id,
        }
        const data = await this.imageService.createImage(image)

        return {
            id: data.id,
            name: data.name,
            description: data.description,
            portfolio: data.portfolio,
            url: data.url,
        }
    }

    @Delete('/:portfolio_id/image/:photoId')
    @UseBefore(PortfolioMiddleware)
    @UseBefore(AuthMiddleware)
    async deleteImage(@Param('photoId') photoId: string) {
        const data = await this.imageService.findImage(+photoId)
        if (data) {
            await cloudinary.uploader.destroy(data.cloudinary_id)

            await this.imageService.deleteImage(+photoId)
        }

        return { message: 'Image deleted' }
    }
}
