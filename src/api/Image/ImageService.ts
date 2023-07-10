import { dataSource } from '@services/database/dataSource'
import { Image } from './Image.entity'

import { Image as imageDto } from './Image.dto'

class ImageService {
    private imageRepository = dataSource.getRepository(Image)

    async createImage(image: imageDto) {
        const data = await this.imageRepository.save(image)
        return data
    }

    async deleteImage(id: number) {
        await this.imageRepository.delete(id)
    }
    async findImage(id: number) {
        const data = await this.imageRepository.findOne({
            where: { id },
            relations: ['portfolio'],
        })
        return data
    }

    async findImages() {
        const data = await this.imageRepository.find({
            relations: ['portfolio'],
            select: {
                portfolio: {
                    name: true,
                },
            },
            order: {
                created_at: 'DESC',
            },
        })

        console.log(data)

        return data.map((data) => data.toResponseObject())
    }

    async findImagesByPortfolioId(id: number) {
        const data = await this.imageRepository.find({
            where: { portfolio: { id: id } },
        })
        return data
    }
}

export const instanceImageService = new ImageService()
