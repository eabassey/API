import { DataSource } from "typeorm"
import { Todo } from "./entity/todo.entity"

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "postgres",
    entities: [Todo],
    logging: true,
    synchronize: true,
})