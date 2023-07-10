import { DataSourceOptions, DataSource } from 'typeorm'

import config from '@config'

import { User } from '@api/User/User.entity'

import { Portfolio } from '@api/Portfolio/Portfolio.entity'

import { Image } from '@api/Image/Image.entity'

const {
    db: { database, port, host, user, password },
} = config

const options = {
    type: 'postgres',
    host,
    port: port,
    password,
    username: user,
    database,
    entities: [User, Portfolio, Image],
    migrations: [`${__dirname}/../../migrations/**/*.{ts,js}`],
    synchronize: false,
} as DataSourceOptions

export const dataSource = new DataSource(options)
