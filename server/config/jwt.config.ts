import JWT, { VerifyOptions } from 'jsonwebtoken';
import createError from 'http-errors';
import { client } from './redis.config';

import express, { NextFunction } from 'express';

export function signAccessToken(userId: string) {
	return new Promise((resolve, reject) => {
		const payload = {};
		const secret = process.env.ACCESS_TOKEN_SECRET ?? '';
		const options = {
			expiresIn: '1h',
			issuer: 'localhost',
			audience: userId
		};
		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				return reject(err);
			}
			resolve(token);
		});
	});
}


export function verifyAccessToken(req: express.Request, res: express.Response, next: NextFunction) {
	if (!req.headers['authorization']) {
		return next(new createError.Unauthorized());
	}
	const authHeader = req.headers['authorization'];
	const bearerToken = authHeader.split(' ');
	const token = bearerToken[1];
	JWT.verify(token, process.env.ACCESS_TOKEN_SECRET ?? '', (err: any, payload: VerifyOptions | undefined) => {
		if (err) {
			if (err.name === 'JsonWebTokenError') {
				return next(new createError.Unauthorized());
			}
			return next(new createError.Unauthorized(err.message));
		}
		// req.payload = payload;
		next();
	});
}

export function signRefreshToken(userId: string) {
	return new Promise((resolve, reject) => {
		const payload = {};
		const secret = process.env.REFRESH_TOKEN_SECRET ?? '';
		const options = {
			expiresIn: '1y',
			issuer: 'localhost',
			audience: userId
		};
		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				return reject(new createError.InternalServerError());
			}
			client.SET(userId, token ?? '', 'EX', 365 * 24 * 60 * 60, (err: any, reply: any) => {
				if (err) {
					console.error(err.message);
					return reject(new createError.InternalServerError());
				}
				return resolve(token);
			});
			return resolve(token);
		});
	});
}

export function verifyRefreshToken(refreshToken: string) {
	return new Promise((resolve, reject) => {
		JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET ?? '', (err, payload) => {
			if (err) {
				return reject(new createError.Unauthorized());
			}
			const userId = 'ss'//payload?.audience;
			client.GET(userId, (err, result) => {
				if (err) {
					console.error(err.message);
					return reject(new createError.InternalServerError());
				}
				if (refreshToken === result) {
					resolve(userId);
					return;
				} else {
					console.log('ddd');
				}
				return reject(new createError.Unauthorized());
			});
		})
	});
}
