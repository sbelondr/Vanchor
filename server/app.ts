// import
require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
import cors from 'cors';

// Settings
require('./config/mongo.config');
require('./config/redis.config');
const app = express();
const PORT = parseInt(process.env.PORT ?? '3000', 10);

// import routes
import { AuthRoutes } from './Routes/Auth.route';
import { ApiRoutes } from './Routes/Api.route';
import { RouteConfig } from './config/route.config';

const routes: Array<RouteConfig> = [];

// app
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// route
routes.push(new AuthRoutes(app));
routes.push(new ApiRoutes(app));

app.get('/', async (req, res, next) => {
    res.end('Hi, in the Vanchor api');
})

app.use(async (req: Request, res: Response, next: NextFunction) => {
    next(new createError.NotFound());
});

/*
 * manage error
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
