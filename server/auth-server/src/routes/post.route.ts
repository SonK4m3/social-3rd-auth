import PostController from '../controller/post.controller';
import BaseRouter from './abstractions/base.route';
import { verifyJWT } from '../middleware/authJwt';

class PostRouter extends BaseRouter {
	prefix: string = '/posts';
	readonly postController: PostController = new PostController();

	constructor() {
		super();
		this.initializeRoutes();
	}

	initializeRoutes(): void {
		this.router.get('/', [verifyJWT], this.postController.getAllPosts);
	}
}

export default PostRouter;
