import * as express from 'express';
import {Request, Response} from 'express';
import * as routes from './routes';

const app = express();
app.use(express.json());


// GENERATE ROUTES
Object.values(routes).forEach(routeFn => routeFn(app));


app.listen(3000);