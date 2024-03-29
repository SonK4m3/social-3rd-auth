import { FastifyInstance, FastifyRequest } from 'fastify';
import authRoutes from './auth.route';

import { userSchemas } from '../models/user.model';

type Role = 'admin' | 'user';

const routes = async (server: FastifyInstance) => {
	for (const schema of [...userSchemas]) {
		server.addSchema(schema);
	}

	//authorization
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
	});

	// register sub-routes
	server.register(authRoutes, { prefix: '/auth' });
};

export default routes;
