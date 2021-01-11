const createError = require('http-errors');
const Timer = require('../Models/Timer.model');
const { timerSchema } = require('../Models/Joi/Timer.joi');

module.exports = {
    get_timer: async(req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw createError.BadRequest();
            }
            const result = await Timer.findOne({idUser: id});
            res.send(result);
        } catch (error) {
            if (error.isJoi == true) error.status = 422;
            next(error);
        }
    },
    post_timer: async(req, res, next) => {
        try {
            const result = await timerSchema.validateAsync(req.body);
            const newTimer = new Timer(result);
            const savedTimer = await newTimer.save();
            res.send({id: savedTimer._id});
        } catch (error) {
            if (error.isJoi == true) error.status = 422;
            next(error);
        }
    },
    update_timer: async(req, res, next) => {
        try {
            const { id, mode, pomodoro, timer } = req.body;
            const result = await Timer.updateOne({ _id: id }, {
                mode: mode,
                pomodoro: pomodoro,
                timer: timer
            });
            res.send({ result: result.nModified });
        } catch (err) {

            if (err) next(err)
        }
    },
    delete_timer: async(req, res, next) => {
        try {
            const { id } = req.body;
            if (!id) {
                throw createError.BadRequest();
            }

            Timer.deleteOne({ _id: id }, (err) => {
                if (err) next(err);
            });
            res.send({result: 1});
        } catch (error) {
            next(error);
        }
    }
}
