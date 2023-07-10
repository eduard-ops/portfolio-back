export interface IServer {
    init(): void
}

export interface IDataBase {
    init(): Promise<void>
}

export interface IApplication {
    init(): Promise<void>
}
