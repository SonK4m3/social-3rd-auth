import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const verifyGoogleToken = async (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	const client = new OAuth2Client(GOOGLE_CLIENT_ID);
	try {
		const ticket = await client.verifyIdToken({
			idToken: body.credential,
			audience: GOOGLE_CLIENT_ID,
		});
		req.body = ticket.getPayload();
		next();
	} catch (error) {
		return { error: 'Invalid user detected. Please try again' };
	}
};
interface Config {
	[key: string]: string;
}

const FB_APP_ID = process.env.FB_APP_ID as string;
const FB_API_SECRET = process.env.FB_API_SECRET as string;

const verifyFB = (signedRequest: string, appId: string): false | Record<string, unknown> => {
	const _config: Config = {
		[FB_APP_ID]: FB_API_SECRET,
	};

	const secret = _config[appId];
	if (!secret) {
		throw Error(`${{ request: signedRequest, appId: appId }}, 'Invalid FB App ID'`);
	}

	// split values from request
	const [encodedSig, payload] = signedRequest.split('.');

	// decode the signature
	const sig = Buffer.from(encodedSig, 'base64');

	// create hash and compare to signature
	const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest();

	if (!crypto.timingSafeEqual(sig, expectedSig)) {
		throw Error(`${{ request: signedRequest, appId: appId }}, 'Invalid FB Signature'`);
	}

	// success! return parsed json object
	return JSON.parse(Buffer.from(payload, 'base64').toString());
};

export { verifyGoogleToken, verifyFB };
