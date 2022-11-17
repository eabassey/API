import {Request, Response, Express} from 'express';
import { DataSource } from 'typeorm';
import { Todo } from '../entity/todo.entity';
import { verifyToken } from '../middlewares/verify-auth';

/**
 * An endpoint for getting a list of todo items
 * @param app Express application instance
 * @param dataSource Access to connected DB
 */
export const listTodos = (app: Express, dataSource: DataSource) => {
    //
    app.get("/api/todos", verifyToken(app, dataSource), async function (req: any, res: Response) {
        const todos = await dataSource.getRepository(Todo).find();
        return res.json(todos);
    })
}