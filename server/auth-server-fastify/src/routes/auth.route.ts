import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import UserController from '../controllers/auth.controller';
import { $ref, CreateUserInput, LoginInput } from '../models/user.model';

const userController = new UserController();
const userRoutes = async (server: FastifyInstance) => {
	server.post(
		'/signup',
		{ schema: { body: $ref('createUserSchema'), response: { 201: $ref('userRepsonseSchema') } } },
		(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) =>
			userController.registerUserHandler(request, reply),
	);

	server.post(
		'/login',
		{ schema: { body: $ref('loginSchema'), response: { 200: $ref('loginResponseSchema') } } },
		(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => userController.loginHandler(request, reply),
	);

	server.post(
		'/facebook',
		{ schema: { body: $ref('loginSchema'), response: { 200: $ref('loginResponseSchema') } } },
		(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => userController.loginHandler(request, reply),
	);

	server.post(
		'/google',
		{ schema: { body: $ref('loginSchema'), response: { 200: $ref('loginResponseSchema') } } },
		(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => userController.loginHandler(request, reply),
	);

	server.get('/', { preHandler: [server.authenticate] }, userController.getUsersHandler);
};

export default userRoutes;
