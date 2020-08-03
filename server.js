const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const signUp = require('./controllers/signUp');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

app.get('/', (req, res) => res.send('hello boy :)'));
//app.get('/', (req, res) => db('users').select('*').then(users => res.json(users)));
app.post('/signin', (req, res) => signIn.handler(req, res, db, bcrypt));
app.post('/signup', (req, res) => signUp.handler(req, res, db, bcrypt));
app.get(('/profile/:id'), (req, res) => profile.handler(req, res, db));
app.put('/image', (req, res) => image.handler(req, res, db));
app.post('/imageurl', (req, res) => image.apiCall(req, res));

app.listen(process.env.PORT);