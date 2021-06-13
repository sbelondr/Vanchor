import { UserModel } from './../Models/User.model';
import { authSchema, userSchema } from '../Models/Joi/User.joi';
import createError from 'http-errors';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../config/jwt.config';
import { client } from '../config/redis.config';
import { NextFunction } from 'express';

import * as express from 'express';

export async function ft_register(req: express.Request, res: express.Response, next: NextFunction) {
	try {
		const result = await userSchema.validateAsync(req.body);
		const doesExit = await UserModel.findOne({ email: result.email });
		if (doesExit) throw new createError.Conflict(`${result.email} is already register`);

		const newUser = new UserModel(result);
		const savedUser = await newUser.save();
		const accessToken = await signAccessToken(savedUser.id);
		const refreshToken = await signRefreshToken(savedUser.id);
		const data = JSON.stringify({ statusCode: 200, accessToken: accessToken, refreshToken: refreshToken })
		res.status(200).send(data);
		// res.json().then(data => data);
	} catch (error) {
		if (error.isJoi === true) error.status = 422;
		next(error);
	}
}

export async function ft_login(req: express.Request, res: express.Response, next: express.NextFunction) {
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

// export async function ft_refresh_token(req, res, next) {
// 	try {
// 		const { refreshToken } = req.body;

// 		if (!refreshToken) {
// 			throw new createError.BadRequest();
// 		}
// 		const userId = await verifyRefreshToken(refreshToken);

// 		const user = await UserModel.findOne({ _id: userId });
// 		const accessToken = await signAccessToken(userId);
// 		const newRefreshToken = await signRefreshToken(userId);
// 		res.send({
// 			id: user._id,
// 			lastname: user.lastname,
// 			firstname: user.firstname,
// 			email: user.email,
// 			accessToken: accessToken,
// 			refreshToken: newRefreshToken
// 		});
// 		// res.send({accessToken: accessToken, refreshToken: newRefreshToken});
// 	} catch (error) {
// 		next(error);
// 	}
// }

export async function ft_logout(req: express.Request, res: express.Response, next: express.NextFunction) {
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
			console.log(`val: ${val}`);
			res.status(200).send({ result: "1" });

		});
	} catch (error) {
		next(error);
	}
}
