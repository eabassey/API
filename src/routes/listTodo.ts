import {Request, Response, Express} from 'express';

/**
 * An endpoint for getting a list of todo items
 * @param app Express application instance
 */
export const listTodos = (app: Express) => {
    //
    app.get("/api/todos", function (req: Request, res: Response) {
        
    })
}