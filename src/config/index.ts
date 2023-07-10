import dotenv from 'dotenv'

dotenv.config()

export default {
    server: {
        port: process.env.PORT,
    },
    db: {
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
    },
    jwt: {
        accessSecret: process.env.ACCESS_SECRET_KEY,
    },

    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
}
