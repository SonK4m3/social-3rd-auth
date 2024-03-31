import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
	email: z
		.string({
			required_error: 'Email is required',
			invalid_type_error: 'Email must be a valid email address',
		})
		.email(),
	name: z.string(),
	role: z.string(),
};

const createUserSchema = z.object({
	...userCore,
	password: z.string({
		required_error: 'Password is required',
		invalid_type_error: 'Password must be a string',
	}),
});

const userRepsonseSchema = z.object({
	id: z.number(),
	...userCore,
});

const loginSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required',
			invalid_type_error: 'Email must be a valid email address',
		})
		.email(),
	password: z.string(),
});

const loginResponseSchema = z.object({
	token: z.string(),
});

const ggRequestSchema = z.object({
	credential: z.string(),
	clientId: z.string(),
	select_by: z.string().nullable(),
});

type SuccessResponse = {
	/** An access token for the person using the webpage. */
	accessToken: string;
	/**
	 * A UNIX time stamp when the token expires. Once the token expires, the person will need to login again.
	 */
	expiresIn: string;
	/**
	 * The amount of time before the login expires, in seconds, and the person will need to login again.
	 */
	reauthorize_required_in: string;
	/**
	 * A signed parameter that contains information about the person using your webpage.
	 */
	signedRequest: string;
	/** The ID of the person using your webpage. */
	userID: string;
};

type ProfileSuccessResponse = {
	id?: string;
	email?: string;
	name?: string;
	picture?: {
		data: {
			height: number;
			width: string;
			is_silhouette: boolean;
			url: string;
		};
	};
	[key: string]: any;
};

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UserResponse = z.infer<typeof userRepsonseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type FacebookRequest = {
	success: SuccessResponse;
	profile: ProfileSuccessResponse;
};
export type GoogleLoginRequest = z.infer<typeof ggRequestSchema>;
export type GoogleUserInfo = {
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
};

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
	{
		createUserSchema,
		userRepsonseSchema,
		loginSchema,
		loginResponseSchema,
	},
	{ $id: 'userSchema' },
);
