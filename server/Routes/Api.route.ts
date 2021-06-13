import { Application } from 'express';
import { RouteConfig } from '../config/route.config';

import { get_note, post_note, update_note, delete_note } from '../Controllers/Note.controller';
import { get_todo, post_todo, update_todo, delete_todo } from '../Controllers/Todo.controller';
import { get_timer, post_timer, update_timer, delete_timer } from '../Controllers/Timer.controller';
import { verifyAccessToken } from '../config/jwt.config';

export class ApiRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'ApiRoutes');
	}

	configureRoutes() {
		this.app.route('/api/note/:id').get([verifyAccessToken, get_note]);
		this.app.route('/api/note').post([verifyAccessToken, post_note]);
		this.app.route('/api/note/update').post([verifyAccessToken, update_note]);
		this.app.route('/api/note/:id').delete([verifyAccessToken, delete_note]);

		this.app.route('/api/todo/:id').get([verifyAccessToken, get_todo]);
		this.app.route('/api/todo').post([verifyAccessToken, post_todo]);
		this.app.route('/api/todo/update').post([verifyAccessToken, update_todo]);
		this.app.route('/api/todo/:id').delete([verifyAccessToken, delete_todo]);

		this.app.route('/api/timer/:id').get([verifyAccessToken, get_timer]);
		this.app.route('/api/timer').post([verifyAccessToken, post_timer]);
		this.app.route('/api/timer/update').post([verifyAccessToken, update_timer]);
		this.app.route('/api/timer/:id').delete([verifyAccessToken, delete_timer]);

		return this.app;
	}
}
