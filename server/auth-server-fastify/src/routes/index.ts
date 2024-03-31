import { FastifyInstance, FastifyRequest } from 'fastify';
import authRoutes from './auth.route';
import { authController } from '../controllers/auth.controller';

import { userSchemas } from '../models/user.model';

type Role = 'admin' | 'user';

const routes = async (server: FastifyInstance) => {
	for (const schema of [...userSchemas]) {
		server.addSchema(schema);
	}

	//Authentication routes
	server.addHook('onRequest', async (request: FastifyRequest<{}>, reply) => {
		const routePath = request.routeOptions.url;

		const nonAuthenticatedRoutes: { route: string; method?: string }[] = [
			{ route: '/api/auth/login', method: 'POST' },
			{ route: '/api/auth/signup', method: 'POST' },
		];

		if (nonAuthenticatedRoutes.some((it) => it.route === routePath && it.method === request.raw.method)) {
			return;
		}

		// Verify JWT
		await request.jwtVerify();

		// Check if the token is blacklisted
		const authorizationHeader = request.headers.authorization;
		const token = authorizationHeader?.split(' ')[1] || '';
		if (authController.tokenBlacklist.includes(token)) {
			throw new Error('Token is invalid');
		}
	});

	// register sub-routes
	server.register(authRoutes, { prefix: '/auth' });
	server.get('/test', (request, reply) => {
		reply.send({
			blacklisted: authController.tokenBlacklist,
			user: request.user,
		});
	});
};

export default routes;
