import createError from 'http-errors';
import { TimerModel } from '../Models/Timer.model';
import { timerSchema } from '../Models/Joi/Timer.joi';

import { Request, Response, NextFunction } from 'express';
import { CallbackError } from 'mongoose';

export async function get_timer(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		if (!id) {
			throw new createError.BadRequest();
		}
		const result = await TimerModel.findOne({ idUser: id });
		res.send(result);
	} catch (error) {
		if (error.isJoi == true) error.status = 422;
		next(error);
	}
}

export async function post_timer(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await timerSchema.validateAsync(req.body);
		const newTimer = new TimerModel(result);
		const savedTimer = await newTimer.save();
		res.send({ id: savedTimer._id });
	} catch (error) {
		if (error.isJoi == true) error.status = 422;
		next(error);
	}
}

export async function update_timer(req: Request, res: Response, next: NextFunction) {
	try {
		const { id, mode, pomodoro, timer } = req.body;
		const result = await TimerModel.updateOne({ _id: id }, {
			mode: mode,
			pomodoro: pomodoro,
			timer: timer
		});
		res.send({ result: result.nModified });
	} catch (err) {

		if (err) next(err)
	}
}

export async function delete_timer(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.body;
		if (!id) {
			throw new createError.BadRequest();
		}

		TimerModel.deleteOne({ _id: id }, undefined, (err: CallbackError) => {
			if (err) next(err);
		});
		res.send({ result: 1 });
	} catch (error) {
		next(error);
	}
}
