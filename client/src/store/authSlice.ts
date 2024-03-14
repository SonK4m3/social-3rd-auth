import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	isLoggedIn: boolean;
	token: string | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	isLoggedIn: false,
	token: null,
	isLoading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart(state) {
			state.isLoading = true;
			state.error = null;
		},
		loginSuccess(state, action) {
			state.isLoggedIn = true;
			state.token = action.payload.token;
			state.isLoading = false;
			state.error = null;

			localStorage.setItem('token', action.payload.token);
		},
		logout(state) {
			state.isLoggedIn = false;
			state.token = null;
			state.isLoading = false;
			state.error = null;

			localStorage.removeItem('token');
			window.location.reload();
		},
		// ... (Add logout, error handling as needed)
	},
});

export type LoginType = typeof authSlice.actions.loginSuccess.type;
export const authActions = authSlice.actions;
export default authSlice.reducer;
