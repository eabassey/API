import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import {Request, Response} from 'express';
import * as routes from './routes';
import { appDataSource } from './app-data-source';


appDataSource
.initialize()
.then(async () => {
    console.log("Data Source has been initialized!");
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
});


const app = express();
app.use(express.json());


// GENERATE ROUTES
Object.values(routes).forEach(routeFn => routeFn(app,appDataSource));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`TODO API Listening on port ${PORT}`);
});