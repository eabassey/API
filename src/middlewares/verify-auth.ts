import * as jwt from 'jsonwebtoken';
import {Request, Response, NextFunction, Express} from 'express';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';

/**
 * A middleware for validating tokens
 * @param app Express application instance
 * @param dataSource Access to connected DB
 */
 export const verifyToken = (app: Express, dataSource: DataSource) => {
    //
    return async (req: any, res: Response, next: NextFunction) => {
        
        if (req?.headers?.authorization?.split(' ')[0] === 'Bearer') {
            jwt.verify(
                req.headers.authorization.split(' ')[1], 
                process.env.SECRET || '', 
               async (err: any, decoded: any) => {
                    if (err) {
                        req.user = undefined;
                        return res.status(403)
                            .send({
                                error: "Unauthorized access"
                            });
                    } else {
                        const user = await dataSource.getRepository(User).findOneBy({
                            id: +decoded.id,
                        });

                        req.user = user;
                        next();
                    }

                }
            )
        } else {
            return res.status(403)
              .send({
                error: "Unauthorized access"
              });
        };
    };
};