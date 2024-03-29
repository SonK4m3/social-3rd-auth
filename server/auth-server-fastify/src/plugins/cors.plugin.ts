import fastifyPlugin from 'fastify-plugin';
import fastifyCors, { FastifyCorsOptions } from '@fastify/cors';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default fastifyPlugin<FastifyCorsOptions>(async (fastify: FastifyInstance, opts: FastifyCorsOptions) => {
	fastify.register(fastifyCors);

	const allowedOrigins = opts.origin || '*'; // Default to allow all
	const allowedMethods = opts.methods || ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

	fastify.addHook('preHandler', (request: FastifyRequest, reply: FastifyReply, done) => {
		reply.header('Access-Control-Allow-Origin', allowedOrigins);
		reply.header(
			'Access-Control-Allow-Methods',
			Array.isArray(allowedMethods) ? allowedMethods.join(',') : allowedMethods,
		);
		// reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		done();
	});
});
