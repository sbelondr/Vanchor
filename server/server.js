const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

const {
  getNote,
  insertNote,
  updateNote,
  deleteNote
} = require('./models/note');

const {
  getTodo,
  insertTodo,
  updateTodo,
  deleteTodo
} = require('./models/todo');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app
  .get('/', (req, res) => {
    res.send('Hello')
  })
  // note
  .get('/note', (req, res) => {
    getNote(res)
  })
  .post('/note', (req, res) => {
    insertNote(req.body.title, req.body.content);
    res.sendStatus(200);
  })
  .post('/note/:id', (req, res) => {
    updateNote(req.body.title, req.body.content);
    res.sendStatus(200);
  })
  .delete('/note/:id', (req, res) => {
    deleteNote(req.params.id);
    res.sendStatus(200);
  })
  // todo
  .get('/todo', (req, res) => {
    getTodo(res)
  })
  .post('/todo', (req, res) => {
    insertTodo(req.body.title, req.body.check);
    res.sendStatus(200);
  })
  .post('/todo/:id', (req, res) => {
    updateTodo(req.body.title, req.body.check);
    res.sendStatus(200);
  })
  .delete('/todo/:id', (req, res) => {
    deleteTodo(req.params.id);
    res.sendStatus(200);
  })
  ;

const server = app.listen(process.env.PORT ?? 3000, () => {
  console.log('App listening on port %d!', process.env.PORT ?? 3000);
});
