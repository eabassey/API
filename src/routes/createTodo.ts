import {Request, Response, Express} from 'express';

/**
 * An endpoint for creating a todo item
 * @param app Express application instance
 */
export const createTodo = (app: Express) => {
    //
    app.post("/api/todos", function (req: Request, res: Response) {
        console.log('I am creating a todo')
    })
}