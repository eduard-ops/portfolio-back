import { DataSource } from 'typeorm'

import { IDataBase } from 'src/types/services'

import { dataSource } from './dataSource'

export class Database implements IDataBase {
    private static instance: Database
    private connection: DataSource = dataSource

    constructor() {
        if (!Database.instance) {
            Database.instance = this
        }

        return Database.instance
    }

    async init() {
        await this.connection.initialize()
    }
}
