import { z } from 'zod';

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
	access_token: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UserResponse = z.infer<typeof userRepsonseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export { createUserSchema, loginSchema };
