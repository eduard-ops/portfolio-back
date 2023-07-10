import { Request } from 'express'
import multer from 'multer'

const memoryStorage = multer.memoryStorage()

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: (arg0: null, arg1: boolean) => void
) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true)
    }

    cb(null, false)
}

export const upload = multer({
    storage: memoryStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
})
