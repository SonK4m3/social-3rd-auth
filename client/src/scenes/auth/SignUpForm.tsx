import GreyButton from '@/components/GreyButton';
import GreyTextField from '@/components/GreyTextField';
import { Grid } from '@mui/material';
import React, { useState } from 'react';

interface SignUpFormProps {
	onSubmit: (user: { email: string; name: string; password: string }) => void;
}

const initialSignUpUser = {
	email: '',
	name: '',
	password: '',
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
	const [user, setUser] = useState<{
		email: string;
		name: string;
		password: string;
	}>(initialSignUpUser);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(user); // Call the provided onSubmit function with email and password
	};

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<GreyTextField
						label="Email Address"
						name="email"
						type="email"
						value={user.email}
						onChange={(event) => setUser((prev) => ({ ...prev, email: event.target.value }))}
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<GreyTextField
						label="Name"
						name="name"
						type="text"
						value={user.name}
						onChange={(event) => setUser((prev) => ({ ...prev, name: event.target.value }))}
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<GreyTextField
						label="Password"
						name="password"
						type={'password'}
						value={user.password}
						onChange={(event) => setUser((prev) => ({ ...prev, password: event.target.value }))}
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<GreyButton variant="contained" type="submit" fullWidth>
						Sign Up
					</GreyButton>
					{/* <GoogleLoginButton /> */}
				</Grid>
			</Grid>
		</form>
	);
};

export default SignUpForm;
