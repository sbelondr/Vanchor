const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    password: Joi.string().min(4).required(),
});

module.exports = {
    authSchema
}
