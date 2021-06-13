import express, { Application } from 'express';
import { RouteConfig } from '../config/route.config';
// import { verifyAccessToken } from '../config/jwt.config';

import {
	ft_register,
	ft_login,
	ft_logout,
	ft_refresh_token
} from '../Controllers/Auth.controller';


function coucou(req: express.Request, res: express.Response) {
	return res.json({'ok': 'ok'})
}
export class AuthRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'AuthRoutes');
	}
	
	configureRoutes() {
		this.app.route('/').get([coucou]);
		this.app.route('/auth/register').post([ft_register]);
		this.app.route('/auth/login').post([ft_login]);
		this.app.route('/auth/refresh-token').post([ft_refresh_token]);
		this.app.route('/auth/logout/:refreshToken').delete([ft_logout]);
		return this.app;
	}
}


// router.get('/', verifyAccessToken, (req, res, next) => {
//     res.send({result: 'OK'});
// })
// router.post('/login', ft_login);
// router.post('/refresh-token', ft_refresh_token);
// router.delete('/logout/:refreshToken', ft_logout)
// module.exports = router;
