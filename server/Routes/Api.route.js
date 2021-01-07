const express = require('express');
const router = express.Router();

const { get_note, post_note, update_note, delete_note } = require('../Controllers/Note.controller');
const { get_todo, post_todo, update_todo, delete_todo } = require('../Controllers/Todo.controller');
const { get_timer, post_timer, update_timer, delete_timer } = require('../Controllers/Timer.controller');

router.get('/note', get_note);
router.post('/note', post_note);
router.post('/note/update', update_note);
router.delete('/note/:id', delete_note);

router.get('/todo', get_todo);
router.post('/todo', post_todo);
router.post('/todo/update', update_todo);
router.delete('/todo/:id', delete_todo);

router.get('/timer', get_timer);
router.post('/timer', post_timer);
router.post('/timer/update', update_timer);
router.delete('/timer/:id', delete_timer);

module.exports = router;
