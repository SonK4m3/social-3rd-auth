import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import BaseRouter from './routes/abstractions/base.route';
import { z } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface AppConstructor {
	routes: BaseRouter[];
	port: number | string;
}

class App {
	private app: express.Application = express();
	private port: number | string;

	constructor(appConstructor: AppConstructor) {
		this.port = appConstructor.port;

		this.initializeMiddleware();
		this.initializeRoutes(appConstructor.routes);
		this.initializeErrorHandler();
	}

	private initializeMiddleware() {
		this.app.use(
			cors({
				origin: ['http://localhost:3000'],
				methods: 'GET,POST,PUT,DELETE,OPTIONS',
			}),
		);

		this.app.use(
			session({
				resave: false,
				saveUninitialized: true,
				secret: 'SECRET',
			}),
		);

		this.app.use(express.json());
		this.app.use(helmet());
		this.app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
		this.app.use(morgan('common'));
		this.app.use(bodyParser.json());
	}

	private initializeRoutes(routes: BaseRouter[]) {
		this.app.get('/', (_req: Request, res: Response) => {
			res.json('hello world!');
		});

		routes.forEach((route) => {
			this.app.use('/api/v1' + route.prefix, route.router);
		});
	}

	private initializeErrorHandler(): void {
		this.app.use((error: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
			console.log('----------go this sh!t---------');
			if (error instanceof z.ZodError) {
				const errors = error.format();
				res.status(400).send(errors);
			} else {
				if (error instanceof PrismaClientKnownRequestError) {
					console.log(error);
				}

				res.status(500).send({
					error: 'Something wrong :(',
					message: error,
				});
			}
		});
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`[server]: Server is running at http://localhost:${this.port}`);
		});
	}
}

export default App;
