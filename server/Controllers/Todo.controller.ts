import createError from 'http-errors';
import { TodoModel } from '../Models/Todo.model';
import { todoSchema } from '../Models/Joi/Todo.joi';

import { Request, Response, NextFunction } from 'express';
import { CallbackError } from 'mongoose';

export async function get_todo(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		if (!id) {
			throw new createError.BadRequest();
		}
		const result = await TodoModel.find({ idUser: id });
		res.send(result);
	} catch (error) {
		if (error.isJoi == true) error.status = 422;
		next(error);
	}
}

export async function post_todo(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await todoSchema.validateAsync(req.body);
		const newTodo = new TodoModel(result);
		const savedTodo = await newTodo.save();
		res.send({ id: savedTodo._id });
	} catch (error) {
		if (error.isJoi == true) error.status = 422;
		next(error);
	}
}

export async function update_todo(req: Request, res: Response, next: NextFunction) {
	try {
		const { id, title, check } = req.body;
		const result = await TodoModel.updateOne({ _id: id }, {
			title: title,
			check: check
		});
		res.send({ result: result.nModified });
	} catch (err) {
		if (err) next(err)
	}
}

export async function delete_todo(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		if (!id) {
			throw new createError.BadRequest();
		}
		TodoModel.deleteOne({ _id: id }, undefined, (err: CallbackError) => {
			if (err) next(err);
		});
		res.send({ result: 1 });
	} catch (error) {
		next(error);
	}
}
