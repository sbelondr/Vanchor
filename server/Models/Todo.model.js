const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    check: {
        type: Number,
        required: true
    }
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
