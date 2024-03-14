import { CreateUserInput } from '../model/user.model';
import prisma from '../prisma';

class UserRepository {
	constructor() {}

	async createUser(input: CreateUserInput) {
		return await prisma.user.create({
			data: { ...input },
		});
	}

	async findUserByEmail(email: string) {
		return await prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	async getUsers() {
		return await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
			},
		});
	}
}

export default UserRepository;
