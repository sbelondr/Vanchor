// import

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const { verifyAccessToken } = require('./config/jwt.config');
const cors = require('cors');

// Settings
require('./config/mongo.config');
require('./config/redis.config');
const app = express();
const PORT = parseInt(process.env.PORT, 10) ?? 3000;
const AuthRoute = require('./Routes/Auth.route');
const ApiRoute = require('./Routes/Api.route');
// const client = require('./config/redis.config');

// app
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/auth', AuthRoute);
app.use('/api', ApiRoute);

app.get('/', verifyAccessToken, async (req, res, next) => {
    res.end('Hi, in Vanchor api');
})

app.use(async (req, res, next) => {
    next(createError.NotFound());
});

/*
 * manage error
 */
app.use((err, req, res, next) => {
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