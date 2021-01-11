const Joi = require('joi');

const noteSchema = Joi.object({
    idUser: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
});

module.exports = {
    noteSchema
}
