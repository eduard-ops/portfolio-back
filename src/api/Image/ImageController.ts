import { JsonController, Get } from 'routing-controllers'

import { instanceImageService } from './ImageService'

@JsonController('/images')
export default class ImageController {
    public service = instanceImageService

    @Get('/')
    async getAllImages() {
        const data = await this.service.findImages()

        return { data }
    }
}
