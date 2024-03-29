import fastify, { errorCodes } from 'fastify';
import authenticatePlugin from './plugins/authenticate.plugin';
import authorizePlugin from './plugins/authorize.plugin';
import routes from './routes';
import corsPlugin from './plugins/cors.plugin';

const PORT = parseInt(process.env.PORT || '3000');

const server = fastify({ logger: false });

declare module 'fastify' {
	type Authenticate = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

	type Authorize = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

	export interface FastifyInstance {
		authenticate: Authenticate;
		authorize: any;
	}

	interface FastifyContextConfig {
		allowedRoles?: string[];
	}
}

type Role = 'admin' | 'user';

interface User {
	id: number;
	email: string;
	name: string;
	role: Role;
}

declare module '@fastify/jwt' {
	export interface FastifyJWT {
		user: User;
	}
}

// plugins
server.register(authenticatePlugin);
server.register(authorizePlugin);
server.register(corsPlugin, {
	origin: 'http://127.0.0.1:3000',
	methods: ['POST', 'PUT', 'DELETE', 'OPTIONS'],
});

server.register(routes, { prefix: '/api' });

server.setErrorHandler((error, request, reply) => {
	if (error instanceof errorCodes.FST_ERR_BAD_STATUS_CODE) {
		server.log.error(error);
		reply.status(500).send({ message: 'Server internal error!' });
	} else {
		reply.send(error);
	}
});

const start = async () => {
	try {
		await server.listen({ port: PORT });
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
