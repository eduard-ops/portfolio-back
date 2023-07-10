import { Server } from './services/express'

import { IApplication } from './types/services'

import { Database } from './services/database'

export class App implements IApplication {
    private static instance: App

    private server: Server = new Server()

    private db: Database = new Database()

    constructor() {
        if (!App.instance) {
            App.instance = this
        }

        return App.instance
    }
    async init() {
        const { server, db } = this
        try {
            await db.init()
            server.init()
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error', error.message)
                process.exit(1)
            }
        }
    }
}
