import { IServer } from 'src/types/services'

import 'reflect-metadata'

import express from 'express'

import { useExpressServer } from 'routing-controllers'

import { controllers } from '@api/index'

import config from '@config'

import { HttpErrorHandler, NotFoundMiddleware } from '@middlewares'

const {
    server: { port },
} = config

const PORT = port || 3000

export class Server implements IServer {
    private routePrefix = '/api'
    public server = express()
    private static instance: Server

    constructor() {
        if (!Server.instance) {
            Server.instance = this
        }
        return Server.instance
    }
    init() {
        const { server, routePrefix } = this
        server.use(express.json())
        useExpressServer(server, {
            cors: true,
            defaultErrorHandler: false,
            routePrefix,
            middlewares: [NotFoundMiddleware, HttpErrorHandler],
            controllers,
        })

        server.listen(PORT, () =>
            console.log(`Database connected, server started on port ${PORT}`)
        )
    }
}
