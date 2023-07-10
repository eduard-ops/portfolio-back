import { v2 } from 'cloudinary'

import config from '@config'

const {
    cloudinary: { cloud_name, api_key, api_secret },
} = config

v2.config({
    cloud_name,
    api_key,
    api_secret,
})

export default v2
