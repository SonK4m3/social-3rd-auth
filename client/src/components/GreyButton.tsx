import { Button, styled } from '@mui/material';

const GreyButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.grey[700],
	'&:hover': {
		backgroundColor: theme.palette.grey[800],
	},
}));

export default GreyButton;
