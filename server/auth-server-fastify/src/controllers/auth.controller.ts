import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginInput } from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import UserService from '../services/user.services';

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

class UserController {
	constructor() {}

	async registerUserHandler(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
		const body = request.body;

		const user = await userService.createUser(body);
		return reply.code(201).send(user);
	}

	async loginHandler(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
		const body = request.body;

		const user = await userService.findUserByEmail(body.email);

		if (!user) {
			return reply.code(401).send({
				message: 'Invalid email or password',
			});
		}

		const correctPassword = body.password === user.password;

		if (correctPassword) {
			const { password, ...rest } = user;
			const token = await reply.jwtSign(rest);
			return {
				accessToken: token,
			};
		}
	}

	async getUsersHandler() {
		const users = await userService.findUsers();

		return users;
	}
}

export default UserController;
