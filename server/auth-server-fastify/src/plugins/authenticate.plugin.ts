import fastifyPlugin from 'fastify-plugin';
import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

export default fastifyPlugin<FastifyJWTOptions>(async (fastify: FastifyInstance) => {
	fastify.register(fastifyJwt, {
		secret: 'sonkameSecret',
	});

	fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
		await request.jwtVerify();
	});
});
