import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repository/user.repository';
import { CreateUserInput, LoginInput, UserResponse } from '../model/user.model';
import UserService from '../services/user.services';
import { generateAccessToken } from '../middleware/authJwt';

interface GoogleUserInfo {
	aud: string;
	azp: string;
	email: string;
	email_verified: boolean;
	exp: number;
	family_name: string;
	given_name: string;
	iat: number;
	iss: string;
	jti: string;
	locale: string;
	name: string;
	nbf: number;
	picture: string;
	sub: string;
}

const userRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

export default class AuthController {
	constructor() {}

	async signup(req: Request, res: Response, next: NextFunction) {
		const body = req.body as CreateUserInput;
		try {
			const existingUser = await userService.findUserByEmail(body.email);
			if (!existingUser)
				return res.status(404).json({
					message: 'User already exists!',
				});

			const newUser = (await userService.createUser(body)) as UserResponse;
			res.status(201).send(newUser);
		} catch (err) {
			next(err);
		}
	}

	async signin(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body as LoginInput;
		try {
			const existingUser = await userService.findUserByEmail(email);
			if (!existingUser)
				return res.status(404).json({
					message: 'User does not exist!',
				});

			// compare password here
			const isPasswordCorrect = password === existingUser.password;
			if (!isPasswordCorrect)
				return res.status(400).json({
					message: 'Password is incorrect',
				});

			const jwtToken = generateAccessToken({
				email: existingUser.email,
				id: existingUser.id,
			});
			res.status(200).json({ token: jwtToken });
		} catch (err) {
			next(err);
		}
	}

	async oauth2Google(req: Request, res: Response, next: NextFunction) {
		try {
			const userProfile = req.body as GoogleUserInfo;

			const jwtToken = generateAccessToken({ id: userProfile.aud, email: userProfile.email });
			res.status(200).json({ token: jwtToken });
		} catch (err) {
			next(err);
		}
	}

	async oauth2Facebook() {}
}
