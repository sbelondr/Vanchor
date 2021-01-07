const createError = require('http-errors');
const Todo = require('../Models/Todo.model');
const { todoSchema } = require('../Models/Joi/Todo.joi');

module.exports = {
    get_todo: async(req, res, next) => {
        try {
            const result = await Todo.find({});
            res.send(result);
        } catch (error) {
            if (error.isJoi == true) error.status = 422;
            next(error);
        }
    },
    post_todo: async(req, res, next) => {
        try {
            const result = await todoSchema.validateAsync(req.body);
            const newTodo = new Todo(result);
            const savedTodo = await newTodo.save();
            res.send({id: savedTodo._id});
        } catch (error) {
            if (error.isJoi == true) error.status = 422;
            next(error);
        }
    },
    update_todo: async(req, res, next) => {
        try {
            const { id, title, check } = req.body;
            const result = await Todo.updateOne({ _id: id }, {
                title: title,
                check: check
            });
            res.send({ result: result.nModified });
        } catch (err) {
            if (err) next(err)
        }
    },
    delete_todo: async(req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw createError.BadRequest();
            }
            Todo.deleteOne({ _id: id }, (err) => {
                if (err) next(err);
            });
            res.send({result: 1});
        } catch (error) {
            next(error);
        }
    }
}
