const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    pomodoro: {
        type: String,
        required: true
    },
    timer: {
        type: Number,
        required: true
    }
});

const Timer = mongoose.model('timer', TimerSchema);

module.exports = Timer;
