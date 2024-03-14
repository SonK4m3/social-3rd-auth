import PostRepository from '../repository/post.repository';

class PostService {
	constructor(readonly postRepository: PostRepository) {}

	async getAllPosts() {
		return await this.postRepository.getAllPosts();
	}
}

export default PostService;
