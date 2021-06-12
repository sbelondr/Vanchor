// import

require('dotenv').config();
import express, { NextFunction } from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
import { verifyAccessToken } from './config/jwt.config';
const cors = require('cors');

// Settings
require('./config/mongo.config');
require('./config/redis.config');
const app = express();
const PORT = parseInt(process.env.PORT ?? '3000', 10);

import { AuthRoutes } from './Routes/Auth.route';
// import ApiRoute from './Routes/Api.route';

import { RouteConfig } from './config/route.config';
const routes: Array<RouteConfig> = [];

//// const client = require('./config/redis.config');

// app
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// route

routes.push(new AuthRoutes(app));

// app.use('/auth', AuthRoutes);
// app.use('/api', ApiRoute);

// app.get('/', verifyAccessToken, async (req, res, next) => {
//     res.end('Hi, in Vanchor api');
// })

app.use(async (req, res, next) => {
    next(new createError.NotFound());
});

/*
 * manage error
 */
app.use((err: any, req: express.Request, res: express.Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`))

module.exports = app;