import { Button } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '@/store/authSlice';
import { useOauthMutation } from '@/state/api';

const GoogleLoginButton = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [oauth] = useOauthMutation();

	const sendToken = async (credentialResponse: CredentialResponse) => {
		try {
			const result = await oauth({
				credentials: credentialResponse,
				provider: 'gg',
			}).unwrap();
			if (result.token) {
				dispatch(authActions.loginSuccess(result));
				navigate('/dashboard');
			}
		} catch (err) {
			console.error(err);
		}
	};

	const onSuccess = (credentialResponse: CredentialResponse) => {
		sendToken(credentialResponse);
	};

	return (
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
	);
};

export default GoogleLoginButton;
