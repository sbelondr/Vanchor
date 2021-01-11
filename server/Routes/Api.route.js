const express = require('express');
const router = express.Router();

const { get_note, post_note, update_note, delete_note } = require('../Controllers/Note.controller');
const { get_todo, post_todo, update_todo, delete_todo } = require('../Controllers/Todo.controller');
const { get_timer, post_timer, update_timer, delete_timer } = require('../Controllers/Timer.controller');
const { verifyAccessToken } = require('../config/jwt.config');

router.get('/note/:id', verifyAccessToken, get_note);
router.post('/note', verifyAccessToken, post_note);
router.post('/note/update', verifyAccessToken, update_note);
router.delete('/note/:id', verifyAccessToken, delete_note);

router.get('/todo/:id', verifyAccessToken, get_todo);
router.post('/todo', verifyAccessToken, post_todo);
router.post('/todo/update', verifyAccessToken, update_todo);
router.delete('/todo/:id', verifyAccessToken, delete_todo);

router.get('/timer/:id', verifyAccessToken, get_timer);
router.post('/timer', verifyAccessToken, post_timer);
router.post('/timer/update', verifyAccessToken, update_timer);
router.delete('/timer/:id', verifyAccessToken, delete_timer);

module.exports = router;
