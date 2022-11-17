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


app.listen(3000, () => {

});