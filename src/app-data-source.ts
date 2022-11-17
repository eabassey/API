import { DataSource } from "typeorm"
import { Todo } from "./entity/todo.entity"
import { User } from "./entity/user.entity"

export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    entities: [Todo, User],
    logging: true,
    synchronize: true,
})