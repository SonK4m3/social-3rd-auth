import { TextField, styled } from '@mui/material';

const GreyTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		'&.Mui-focused fieldset': {
			border: `2px solid ${theme.palette.grey[700]}`,
		},
	},
	'& label.Mui-focused': {
		color: `${theme.palette.grey[700]}`,
	},
}));

export default GreyTextField;
