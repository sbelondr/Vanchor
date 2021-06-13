import { UserModel } from './../Models/User.model';
import { authSchema, userSchema } from '../Models/Joi/User.joi';
import createError from 'http-errors';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../config/jwt.config';
import { client } from '../config/redis.config';

import { Request, Response, NextFunction } from 'express';

export async function ft_register(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await userSchema.validateAsync(req.body);
		const doesExit = await UserModel.findOne({ email: result.email });
		if (doesExit) throw new createError.Conflict(`${result.email} is already register`);

		const newUser = new UserModel(result);
		const savedUser = await newUser.save();
		const accessToken = await signAccessToken(savedUser.id);
		const refreshToken = await signRefreshToken(savedUser.id);
		const data = JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken })
		res.status(200).send(data);
	} catch (error) {
		if (error.isJoi === true) error.status = 422;
		next(error);
	}
}

export async function ft_login(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await authSchema.validateAsync(req.body);
		const user = await UserModel.findOne({ email: result.email });
		if (!user) {
			throw new createError.NotFound('User is not register');
		}
		const isMatch = await user.isValidPassword(result.password);
		if (!isMatch) {
			throw new createError.Unauthorized('Username/password is not valid');
		}
		const accessToken = await signAccessToken(user.id);
		const refreshToken = await signRefreshToken(user.id);
		res.status(200).send({
			id: user._id,
			lastname: user.lastname,
			firstname: user.firstname,
			email: user.email,
			accessToken: accessToken,
			refreshToken: refreshToken
		});
	} catch (error) {
		if (error.isJoi === true) {
			return next(new createError.BadRequest("Invalid username or password"));
		}
		next(error);
	}
}

export async function ft_refresh_token(req: Request, res: Response, next: NextFunction) {
	try {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			throw new createError.BadRequest();
		}
		const userId = await verifyRefreshToken(refreshToken);
		const id: string = typeof userId == 'string' ? userId : '';

		const user = await UserModel.findOne({ _id: id });
		if (user) {
			const accessToken = await signAccessToken(id);
			const newRefreshToken = await signRefreshToken(id);
			res.send({
				id: user._id,
				lastname: user.lastname,
				firstname: user.firstname,
				email: user.email,
				accessToken: accessToken,
				refreshToken: newRefreshToken
			});
		} else {
			throw new createError.Unauthorized('token not exist');
		}
	} catch (error) {
		next(error);
	}
}

export async function ft_logout(req: Request, res: Response, next: NextFunction) {
	try {
		const { refreshToken } = req.params;

		if (!refreshToken) {
			throw new createError.BadRequest();
		}
		const userId: string | unknown = await verifyRefreshToken(refreshToken);
		const id: string = typeof userId == 'string' ? userId : '';
		client.DEL(id, (err, val) => {
			if (err) {
				console.error(err.message);
				throw new createError.InternalServerError();
			}
			res.status(200).send({ result: "1" });

		});
	} catch (error) {
		next(error);
	}
}
