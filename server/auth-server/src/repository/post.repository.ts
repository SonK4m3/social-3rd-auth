import prisam from '../prisma';

class PostRepository {
	async getAllPosts() {
		return await prisam.post.findMany();
	}
}

export default PostRepository;
