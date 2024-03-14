import { Button } from '@mui/material';
import { CredentialResponse, GoogleLogin, googleLogout } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '@/store/authSlice';

const GoogleLoginButton = () => {
	const [user, setUser] = useState<any>(null);
	const [profile, setProfile] = useState<any>(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const sendToken = (credentialResponse: CredentialResponse) => {
		axios
			.post(
				`http://localhost:8080/api/v1/auth/google`,
				{
					credential: credentialResponse,
				},
				{
					headers: {
						Accept: 'application/json',
					},
				},
			)
			.then((res) => {
				dispatch(authActions.loginSuccess(res.data));
				navigate('/dashboard');
			})
			.catch((err) => console.log(err));
	};

	const onSuccess = (credentialResponse: CredentialResponse) => {
		console.log(credentialResponse);
		sendToken(credentialResponse);
	};

	useEffect(() => {
		if (user) {
			axios
				.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
					headers: {
						Authorization: `Bearer ${user.access_token}`,
						Accept: 'application/json',
					},
				})
				.then((res) => {
					setProfile(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [user]);

	const logOut = () => {
		googleLogout();
		setProfile(null);
	};

	return (
		<div>
			{profile ? (
				<div>
					<img src={profile.picture} alt="user image" />
					<h3>User Logged in</h3>
					<p>Name: {profile.name}</p>
					<p>Email Address: {profile.email}</p>
					<br />
					<br />
					<button onClick={logOut}>Log out</button>
				</div>
			) : (
				<Button
					variant="contained"
					color="inherit"
					fullWidth
					sx={{
						marginTop: '10px',
					}}
				>
					<div>
						<GoogleLogin
							onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
							onError={() => console.log('Login failed')}
						/>
						{/* <FlexBetween height="100%" width="100%" gap={1} onClick={() => login()}>
							<GoogleIcon />
							<Typography>Login with Google</Typography>
						</FlexBetween> */}
					</div>
				</Button>
			)}
		</div>
	);
};

export default GoogleLoginButton;
