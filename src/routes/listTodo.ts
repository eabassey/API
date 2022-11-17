import {Request, Response, Express} from 'express';
import { DataSource } from 'typeorm';
import { Todo } from '../entity/todo.entity';

/**
 * An endpoint for getting a list of todo items
 * @param app Express application instance
 * @param dataSource Access to connected DB
 */
export const listTodos = (app: Express, dataSource: DataSource) => {
    //
    app.get("/api/todos", async function (req: Request, res: Response) {
        const todos = await dataSource.getRepository(Todo).find();
        res.json(todos);
    })
}