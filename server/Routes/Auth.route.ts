import { Application } from 'express';
import { RouteConfig } from '../config/route.config';
import { verifyAccessToken } from '../config/jwt.config';

import {
	ft_register,
	ft_login,
	ft_logout,
	ft_refresh_token
} from '../Controllers/Auth.controller';

export class AuthRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'AuthRoutes');
	}
	
	configureRoutes() {
		this.app.route('/auth/register').post([ft_register]);
		this.app.route('/auth/login').post([ft_login]);
		this.app.route('/auth/refresh-token').post([verifyAccessToken, ft_refresh_token]);
		this.app.route('/auth/logout/:refreshToken').delete([ft_logout]);
		return this.app;
	}
}
