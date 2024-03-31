import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { authController } from '../controllers/auth.controller';
import { $ref, CreateUserInput, FacebookRequest, GoogleLoginRequest, LoginInput } from '../models/user.model';

const userRoutes = async (server: FastifyInstance) => {
	server.post(
		'/signup',
		{ schema: { body: $ref('createUserSchema'), response: { 201: $ref('userRepsonseSchema') } } },
		(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) =>
			authController.registerUserHandler(request, reply),
	);

	server.post(
		'/login',
		{ schema: { body: $ref('loginSchema'), response: { 200: $ref('loginResponseSchema') } } },
		(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => authController.loginHandler(request, reply),
	);

	server.post(
		'/facebook',
		{ schema: { body: $ref('loginSchema'), response: { 200: $ref('loginResponseSchema') } } },
		(request: FastifyRequest<{ Body: FacebookRequest }>, reply: FastifyReply) =>
			authController.oauthWithFacebook(request, reply),
	);

	server.post(
		'/google',
		{ schema: { body: $ref('loginSchema'), response: { 200: $ref('loginResponseSchema') } } },
		(request: FastifyRequest<{ Body: GoogleLoginRequest }>, reply: FastifyReply) =>
			authController.oauthWithGoogle(request, reply),
	);

	server.post('/logout', (request: FastifyRequest, reply: FastifyReply) => authController.logout(request, reply));

	server.get('/', { preHandler: [server.authenticate] }, authController.getUsersHandler);
};

export default userRoutes;
