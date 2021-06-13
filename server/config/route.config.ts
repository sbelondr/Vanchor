import { Application } from "express"

// https://cloudnweb.dev/2021/05/express-typescript-basic-auth/

export abstract class RouteConfig {
	app: Application
	name: string

	constructor(app: Application, name: string) {
		this.app = app
		this.name = name
		this.configureRoutes()
	}

	getName() {
		return this.name
	}

	abstract configureRoutes(): Application
}
