const Joi = require('joi');

const todoSchema = Joi.object({
    idUser: Joi.string().required(),
    title: Joi.string().required(),
    check: Joi.number().integer().required(),
});

module.exports = {
    todoSchema
}
