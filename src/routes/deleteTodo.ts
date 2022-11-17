import {Request, Response, Express} from 'express';
import { DataSource } from 'typeorm';
import { Todo } from '../entity/todo.entity';
import { verifyToken } from '../middlewares/verify-auth';

/**
 * An endpoint for deleting a todo item
 * @param app Express application instance
 * @param dataSource Access to connected DB
 */
export const deleteTodo = (app: Express, dataSource: DataSource) => {
    //
    app.delete("/api/todos/:id", verifyToken(app, dataSource), async function (req: Request, res: Response) {
        const todoId = req.params.id;

        const results = await dataSource.getRepository(Todo).delete(todoId);
        return res.send(results)
    })
}