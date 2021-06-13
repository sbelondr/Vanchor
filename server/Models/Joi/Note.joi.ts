import Joi from 'joi';

export const noteSchema = Joi.object({
    idUser: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
});
