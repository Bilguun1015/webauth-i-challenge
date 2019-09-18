const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const dbConnection = require('../database/db-config.js');

const userRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js')

const server = express();

const sessionConfig = {
    name: 'rookieCookie',
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new knexSessionStore({
        knex: dbConnection,
        tablename: 'knexsession',
        sidfieldname: 'sessionid',
        createtable: true,
        clearInterval: 1000 * 60 * 30,
    }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);


server.get('/', (req, res) => {
    res.send('<h3>It is working!</h3>')
});

module.exports = server;
