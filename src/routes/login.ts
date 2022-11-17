import {Request, Response, Express} from 'express';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import { compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

/**
 * An endpoint for login a user and return jwt
 * @param app Express application instance
 * @param dataSource Access to connected DB
 */
export const login = (app: Express, dataSource: DataSource) => {
    //
    app.post("/api/login", async function (req: Request, res: Response) {
        const email = req.body.email.trim();
        const password = req.body.password.trim();
        if (!email || !password) {
            return res.status(400).json({
                error: 'Please provide all required information!',
            })
        }
        // Find user
        const user = await dataSource.getRepository(User).findOneBy({
            email,
        });

        if (!user) {
            return res.status(404).json({
                error: 'User could not be found!',
            })
        } else {

            //compare passwords
            const passwordIsValid = compareSync(
                password,
                user.password
            );
            
            if (!passwordIsValid) {
                return res.status(401).json({
                    error: 'Invalid credentials',
                })
            }

            //
            const token = jwt.sign({
                id: user.id,
                email,
            }, 
            process.env.SECRET || '', {
            })
          
            return res.send({
                id: user.id,
                email: user.email,
                name: user.name,
                token,
            });
        }

    })
}