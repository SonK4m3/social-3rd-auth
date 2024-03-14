import { Request, Response } from 'express';
import PostService from '../services/post.services';
import PostRepository from '../repository/post.repository';

const postRepository: PostRepository = new PostRepository();
const postService: PostService = new PostService(postRepository);

export default class PostController {
	constructor() {}

	async getAllPosts(req: Request, res: Response) {
		const posts = await postService.getAllPosts();
		res.json(posts);
	}
}
