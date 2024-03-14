import AuthController from '../controller/auth.controller';
import { verifyGoogleToken } from '../middleware/authorization';
import { validateRequest } from '../middleware/validateRequest';
import { createUserSchema, loginSchema } from '../model/user.model';
import BaseRouter from './abstractions/base.route';

class AuthenticationRouter extends BaseRouter {
	prefix: string = '/auth';
	readonly authController = new AuthController();

	constructor() {
		super();
		this.initializeRoutes();
	}

	initializeRoutes(): void {
		this.router.post('/signup', [validateRequest(createUserSchema)], this.authController.signup);
		this.router.post('/signin', [validateRequest(loginSchema)], this.authController.signin);

		this.router.post('/google', [verifyGoogleToken], this.authController.oauth2Google);
		this.router.get('/google/redirect', (req, res) => {
			res.send('This is the callback route');
		});

		this.router.post('/facebook', this.authController.oauth2Facebook);
	}
}

export default AuthenticationRouter;
