const express = require('express');
const body = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const app = express();

app.use(body.json());
app.use(cors());

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const signUp = require('./controllers/signUp');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : process.env.MSUSER,
        password : process.env.MSPASS,
        database : process.env.MSDB,
        port: process.env.MSPORT
    },
    log: {
        warn(message) {
            console.log(message);
        },
        error(message) {
            console.log(message);
        },
        deprecate(message) {
            console.log(message);
        },
        debug(message) {
            console.log(message);
        }
    }
});

app.post('/test', (req, res) => res.send('test is passed'));

app.post('/signin', (req, res) => signIn.handler(req, res, db, bcrypt));
app.post('/signup', (req, res) => signUp.handler(req, res, db, bcrypt));
app.get(('/profile/:id'), (req, res) => profile.handler(req, res, db));
app.put('/image', (req, res) => image.handler(req, res, db));
app.post('/imageurl', (req, res) => image.apiCall(req, res));

app.listen(process.env.RUNPORT, () => console.log(`Server is running on PORT ${process.env.RUNPORT}`));