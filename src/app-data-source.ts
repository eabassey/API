import { DataSource } from "typeorm"
import { Todo } from "./entity/todo.entity"

export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    entities: [Todo],
    logging: true,
    synchronize: true,
})