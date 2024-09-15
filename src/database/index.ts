import { DataSourceOptions, DataSource } from "typeorm";
import { POSTGRES_DATABASE, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from "../config";
import path from "path";


// export const dbConfig: DataSourceOptions = {
export const AppDataSource = new DataSource({
    type: "postgres",
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: POSTGRES_DATABASE,
    synchronize: false,
    logging: false,
    entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
    migrations: [path.join(__dirname, '../**/*.migration.{js,ts}')],
    subscribers: [path.join(__dirname, '../**/*.subscriber.{js,ts}')],
    // cli: {
    //     entitiesDir: 'src/entities',
    //     migrationsDir: 'src/migration',
    //     subscribersDir: 'src/subscriber'
    // }
})