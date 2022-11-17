import {Request, Response, Express} from 'express';
import { DataSource } from 'typeorm';
import { Todo } from '../entity/todo.entity';

/**
 * An endpoint for creating a todo item
 * @param app Express application instance
 */
export const createTodo = (app: Express, dataSource: DataSource) => {
    //
    app.post("/api/todos", async function (req: Request, res: Response) {
        const todo = await dataSource.getRepository(Todo).create(req.body);
        const result = await dataSource.getRepository(Todo).save(todo);
        return res.send(result);
    })
}