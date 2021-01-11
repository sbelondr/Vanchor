const Joi = require('joi');

const timerSchema = Joi.object({
    idUser: Joi.string().required(),
    mode: Joi.string().required(),
    pomodoro: Joi.string().required(),
    timer: Joi.number().required(),
});

module.exports = {
    timerSchema
}
