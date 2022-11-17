import {Request, Response, Express} from 'express';
import { DataSource } from 'typeorm';
import { Todo } from '../entity/todo.entity';

/**
 * An endpoint for updating a todo item
 * @param app Express application instance
 * @param dataSource Access to connected DB
 */
export const patchTodo = (app: Express, dataSource: DataSource) => {
    //
    app.patch("/api/todos/:id", async function (req: Request, res: Response) {
        const todo = await dataSource.getRepository(Todo).findOneBy({
            id: +req.params.id,
        })

        if (!todo) {
            return res.status(404).json({
                error: 'The item could not be found!',
            })
        } else {
            dataSource.getRepository(Todo).merge(todo, req.body)
            const results = await dataSource.getRepository(Todo).save(todo)
            return res.send(results)
        }
    })
}