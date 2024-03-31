import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, FacebookRequest, GoogleLoginRequest, LoginInput } from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import UserService from '../services/user.services';
import { verifyFB, verifyGoogleToken } from '../utils/oauth2';

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

	async oauthWithGoogle(request: FastifyRequest<{ Body: GoogleLoginRequest }>, reply: FastifyReply) {
		const userProfile = await verifyGoogleToken(request.body);
		const { email, aud, name } = userProfile;
		const existingUser = await userService.findUserByEmail(email);
		let jwtToken = '';
		if (!existingUser) {
			const { password, ...rest } = await userService.createUser({
				email: email,
				password: aud,
				name: name,
				role: 'user',
			});
			jwtToken = await reply.jwtSign(rest);
		} else {
			const { password, ...rest } = existingUser;
			jwtToken = await reply.jwtSign(rest);
		}
		if (jwtToken === '')
			return reply.status(400).send({
				message: 'Userinfo is incorrect',
			});
		return {
			token: jwtToken,
		};
	}

	async oauthWithFacebook(request: FastifyRequest<{ Body: FacebookRequest }>, reply: FastifyReply) {
		const body: FacebookRequest = request.body;

		const token = await verifyFB(body.success.signedRequest, process.env.FB_APP_ID as string);

		const { email, id, name } = body.profile;
		if (email === undefined || name === undefined || id === undefined)
			return reply.status(400).send({
				message: 'Cannot login with Facebook',
			});

		const existingUser = await userService.findUserByEmail(email);
		let jwtToken = '';
		if (!existingUser) {
			const { password, ...rest } = await userService.createUser({
				email: email,
				password: id,
				name: name,
				role: 'user',
			});
			jwtToken = await reply.jwtSign(rest);
		} else {
			const { password, ...rest } = existingUser;
			jwtToken = await reply.jwtSign(rest);
		}
		if (jwtToken === '')
			return reply.status(400).send({
				message: 'Userinfo is incorrect',
			});
		return {
			token: jwtToken,
		};
	}

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
