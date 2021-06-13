import { Application } from 'express';
import { RouteConfig } from '../config/route.config';

import { get_note, post_note, update_note, delete_note } from '../Controllers/Note.controller';
import { get_todo, post_todo, update_todo, delete_todo } from '../Controllers/Todo.controller';
import { get_timer, post_timer, update_timer, delete_timer } from '../Controllers/Timer.controller';
// import { verifyAccessToken } from '../config/jwt.config';

export class ApiRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'ApiRoutes');
	}

	configureRoutes() {
		this.app.route('/api/note/:id').get([get_note]);
		this.app.route('/api/note').post([post_note]);
		this.app.route('/api/note/update').post([update_note]);
		this.app.route('/api/note/:id').delete([delete_note]);

		this.app.route('/api/todo/:id').get([get_todo]);
		this.app.route('/api/todo').post([post_todo]);
		this.app.route('/api/todo/update').post([update_todo]);
		this.app.route('/api/todo/:id').delete([delete_todo]);

		this.app.route('/api/timer/:id').get([get_timer]);
		this.app.route('/api/timer').post([post_timer]);
		this.app.route('/api/timer/update').post([update_timer]);
		this.app.route('/api/timer/:id').delete([delete_timer]);

		return this.app;
	}
}


// router.get('/note/:id', verifyAccessToken, get_note);
// router.post('/note', verifyAccessToken, post_note);
// router.post('/note/update', verifyAccessToken, update_note);
// router.delete('/note/:id', verifyAccessToken, delete_note);

// router.get('/todo/:id', verifyAccessToken, get_todo);
// router.post('/todo', verifyAccessToken, post_todo);
// router.post('/todo/update', verifyAccessToken, update_todo);
// router.delete('/todo/:id', verifyAccessToken, delete_todo);

// router.get('/timer/:id', verifyAccessToken, get_timer);
// router.post('/timer', verifyAccessToken, post_timer);
// router.post('/timer/update', verifyAccessToken, update_timer);
// router.delete('/timer/:id', verifyAccessToken, delete_timer);

// module.exports = router;
