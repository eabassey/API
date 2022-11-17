import {Request, Response, Express} from 'express';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import { hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

/**
 * An endpoint creating a new user account
 * @param app Express application instance
 * @param dataSource Access to connected DB
 */
export const signup = (app: Express, dataSource: DataSource) => {
    //
    app.post("/api/signup", async function (req: Request, res: Response) {
        const name = req.body?.name?.trim();
        const email = req.body.email.trim();
        const password = req.body.password.trim();
        if (!name || !email || !password) {
            res.status(400).json({
                error: 'Please provide all required information!',
            })
            return;
        }

        let user = new User();
        user.name = name;
        user.email = email;
        user.password = hashSync(password, 8);
      
        const result = await dataSource.manager.save(user);
        return res.send(result);
    })
}