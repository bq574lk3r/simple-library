declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            SENTRY_DSN: string,
            SECRET_KEY: string,

            DATABASE: string,
            DB_USER: string,
            PASSWORD: string,
            HOST: string,
            DIALECT: 'postgres' | 'mysql' | 'sqlite'| 'mariadb'| 'mssql'
        }
    }
}

export { }