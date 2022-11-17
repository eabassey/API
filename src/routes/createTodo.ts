import {Request, Response, Express} from 'express';
import { DataSource } from 'typeorm';
import { Todo } from '../entity/todo.entity';

/**
 * An endpoint for creating a todo item
 * @param app Express application instance
 * @param dataSource Access to connected DB
 */
export const createTodo = (app: Express, dataSource: DataSource) => {
    //
    app.post("/api/todos", async function (req: Request, res: Response) {
        if (!req.body.title || !req.body.title.trim()) {
            res.status(400).json({
                error: 'You did not provide the title of the todo',
            })
            return;
        }

        let todo = new Todo();
        todo.title = req.body.title;
      
        const result = await dataSource.manager.save(todo);
        return res.send(result);
    })
}