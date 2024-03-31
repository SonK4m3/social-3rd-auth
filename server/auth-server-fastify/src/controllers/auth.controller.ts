import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginInput } from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import UserService from '../services/user.services';
import { VerifyPayloadType } from '@fastify/jwt';

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

class AuthController {
	tokenBlacklist: string[] = [];

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
				token: token,
			};
		}
	}

	async getUsersHandler() {
		const users = await userService.findUsers();

		return users;
	}

	async oauthWithGoogle(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {}

	async oauthWithFacebook(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {}

	async logout(request: FastifyRequest, reply: FastifyReply) {
		// Retrieve the token from the request headers
		const authorizationHeader = request.headers.authorization;

		if (!authorizationHeader) {
			// Handle case where authorization header is missing
			reply.code(401).send({ error: 'Authorization header missing' });
			return;
		}
		const token = authorizationHeader.split(' ')[1];

		// Add the token to the blacklist
		this.tokenBlacklist.push(token);
		reply.code(200).send({ message: `${request.user.name} logout successful!` });
	}
}

export default AuthController;
export const authController = new AuthController();
