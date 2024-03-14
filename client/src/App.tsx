import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { themeSettings } from './theme';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './scenes/navbar';
import Dashboard from '@/scenes/dashboard';
import Auth from './scenes/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { authActions } from './store/authSlice';

function App() {
	const theme = useMemo(() => createTheme(themeSettings), []);
	const dispatch = useDispatch();

	return (
		<div className="app">
			<BrowserRouter>
				<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
							<Navbar />
							<Routes>
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/predictions" element={<div>Predictions page</div>} />
								<Route path="/auth" element={<Auth />} />
							</Routes>
						</Box>
					</ThemeProvider>
				</GoogleOAuthProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
