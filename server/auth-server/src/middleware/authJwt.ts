import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const generateAccessToken = (payload: any) => {
	const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' }); // Use a suitable expiration time
	return accessToken;
};

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const token = authHeader.split(' ')[1];
	const isCustomAuth = token.length < 500;

	let decodedData;

	try {
		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, process.env.JWT_SECRET!);
			req.body = decodedData;
		} else {
			decodedData = jwt.decode(token);
			req.body = decodedData?.sub;
		}
		next();
	} catch (error) {
		res.status(403).json({ message: 'Invalid token' });
	}
};

export { generateAccessToken, verifyJWT };
