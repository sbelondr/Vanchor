const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

const { getUser } = require('./models/user');
const { getNote, insertNote } = require('./models/note');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app
  .get('/', (req, res) => {
    res.send('Hello')
  })
  .get('/user', (req, res) => {
    getUser(res)
  })
  .get('/note', (req, res) => {
    getNote(res)
  })
  .post('/note', (req, res) => {
    insertNote(req.body.title, req.body.content);
    res.sendStatus(200);
  });

const server = app.listen(process.env.PORT, () => {
  console.log('App listening on port %d!', process.env.PORT);
});
