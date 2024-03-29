import { CreateUserInput } from '../models/user.model';
import UserRepository from '../repositories/user.repository';

class UserService {
	constructor(readonly userRepository: UserRepository) {}

	async createUser(input: CreateUserInput) {
		const { password, ...rest } = input;
		// hash your password

		const user = await this.userRepository.createUser({
			...rest,
			password,
		});
		return user;
	}

	async findUserByEmail(email: string) {
		return await this.userRepository.findUserByEmail(email);
	}

	async findUsers() {
		return await this.userRepository.getUsers();
	}
}

export default UserService;
