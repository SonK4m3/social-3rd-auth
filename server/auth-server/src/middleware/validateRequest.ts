import { NextFunction, Request, Response } from 'express';
import { Schema } from 'zod';

const validateRequest = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
	const data = schema.parse(req.body);
	req.body = data;
	next();
};

export { validateRequest };
