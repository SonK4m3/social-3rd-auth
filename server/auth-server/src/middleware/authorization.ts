import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const verifyGoogleToken = async (req: Request, res: Response, next: NextFunction) => {
	const credential = req.body.credential;
	const client = new OAuth2Client(GOOGLE_CLIENT_ID);
	try {
		const ticket = await client.verifyIdToken({
			idToken: credential.credential,
			audience: GOOGLE_CLIENT_ID,
		});
		req.body = ticket.getPayload();
		next();
	} catch (error) {
		return { error: 'Invalid user detected. Please try again' };
	}
};

export { verifyGoogleToken };
