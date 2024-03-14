import React, { useState } from 'react';
import { Grid } from '@mui/material';
import GreyButton from '../../components/GreyButton';
import GreyTextField from '../../components/GreyTextField';
import GoogleLoginButton from './GoogleLoginButton';

interface LoginFormProps {
	onSubmit: (email: string, password: string) => void; // Define function for handling form submission
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(email, password); // Call the provided onSubmit function with email and password
	};

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<GreyTextField
						label="Email Address"
						name="email"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<GreyTextField
						label="Password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<GreyButton variant="contained" type="submit" fullWidth>
						Login
					</GreyButton>
					<GoogleLoginButton />
				</Grid>
			</Grid>
		</form>
	);
};

export default LoginForm;
