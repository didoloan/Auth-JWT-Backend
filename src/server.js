const express = require('express');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet')
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const authRoute = require('./api/auth.route')
const userRoute = require('./api/user.route');
require('./utils/init_mongodb');
require('./utils/init_redis');

const app = express()

app.use(cors({
    origin:'https://peaceful-hermann-30e6c8.netlify.app',
    credentials:true
}))

app.use(helmet())

app.use(cookieParser())

app.use(express.json())

app.use(compression({
    level:4,
    threshold:1000*30
}))

app.use(morgan('dev'))

app.use('/auth', authRoute);

app.use('/user', userRoute);

app.use((req, res, next) =>{
    const error = createError.NotFound('This route doesnt exist');
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}.`);
})

module.exports = app;