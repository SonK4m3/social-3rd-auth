import express from 'express';

export default abstract class BaseRouter {
	readonly router: express.Router = express.Router();
	abstract readonly prefix: string;

	abstract initializeRoutes(): void;
}
