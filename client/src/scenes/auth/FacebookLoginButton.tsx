import FlexBetween from '@/components/FlexBetween';
import { Button, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/FacebookRounded';
import FacebookLogin, { ProfileSuccessResponse, SuccessResponse } from '@greatsumini/react-facebook-login';
import { useOauthMutation } from '@/state/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

type Props = {};

const FacebookLoginButton = (props: Props) => {
	const [successResponse, setSuccessResponse] = useState<SuccessResponse>();
	const [oauth] = useOauthMutation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const responseFacebook = async (response: SuccessResponse) => {
		setSuccessResponse(response);
	};

	const responseProfile = async (response: ProfileSuccessResponse) => {
		try {
			const result = await oauth({
				credentials: {
					success: successResponse,
					profile: response,
				},
				provider: 'fb',
			}).unwrap();
			if (result.token) {
				dispatch(authActions.loginSuccess(result));
				navigate('/dashboard');
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<FacebookLogin
			appId={import.meta.env.VITE_FB_APP_ID}
			scope="public_profile,email"
			onSuccess={(response) => {
				responseFacebook(response);
			}}
			onFail={(error) => {
				console.log('Login Failed!', error);
			}}
			onProfileSuccess={(response) => {
				responseProfile(response);
			}}
			render={({ onClick }) => (
				<Button variant="contained" fullWidth sx={{ background: '#4267B2' }} onClick={onClick}>
					<FlexBetween height="100%" gap={1} justifyContent="center">
						<FacebookIcon />
						<Typography>Login with fb</Typography>
					</FlexBetween>
				</Button>
			)}
		/>
	);
};

export default FacebookLoginButton;
