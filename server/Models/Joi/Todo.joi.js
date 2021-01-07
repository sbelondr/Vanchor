const Joi = require('joi');

const todoSchema = Joi.object({
    title: Joi.string().required(),
    check: Joi.number().integer().required(),
});

module.exports = {
    todoSchema
}
