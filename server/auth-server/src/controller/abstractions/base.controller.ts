import { Router } from 'express';

export abstract class BaseController {
	readonly router: Router = Router();
	abstract readonly path: string;
	protected abstract initilazizeRoutes(): void;
}
