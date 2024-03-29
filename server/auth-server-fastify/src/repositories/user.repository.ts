import { Prisma } from '@prisma/client';
import { CreateUserInput } from '../models/user.model';
import prisma from '../prisma';

const userData: Prisma.UserSelect = {
	id: true,
	email: true,
	name: true,
	password: false,
	role: true,
};

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
			select: userData,
		});
	}
}

export default UserRepository;
