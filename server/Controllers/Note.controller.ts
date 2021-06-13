import createError from 'http-errors';
import { NoteModel } from '../Models/Note.model';
import { noteSchema } from '../Models/Joi/Note.joi';

import { Request, Response, NextFunction } from 'express';

export async function get_note(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		console.log(`id: ${id}`);
		
		if (!id) {
			throw new createError.BadRequest();
		}
		console.log('je suis la');
		const result = await NoteModel.find({ idUser: id });
		res.send(result);
	} catch (error) {
		if (error.isJoi == true) error.status = 422;
		next(error);
	}
}

export async function post_note(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await noteSchema.validateAsync(req.body);
		const newNote = new NoteModel(result);
		const savedNote = await newNote.save();

		res.send({ id: savedNote._id });
	} catch (error) {
		if (error.isJoi == true) error.status = 422;
		next(error);
	}
}

export async function update_note(req: Request, res: Response, next: NextFunction) {
	try {
		const { id, title, content } = req.body;
		const result = await NoteModel.updateOne({ _id: id }, {
			title: title,
			content: content
		});
		res.send({ result: result.nModified });
	} catch (err) {
		if (err) next(err)
	}
}

export async function delete_note(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		if (!id) {
			throw new createError.BadRequest();
		}

		NoteModel.deleteOne({ _id: id }, undefined, (err: any) => {
			if (err) next(err);
		});
		res.send({ result: 1 });
	} catch (error) {
		next(error);
	}
}
