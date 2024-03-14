const getGoogleOAuthUrl = (): string => {
	const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
	const options = {
		redirect_url: import.meta.env.GOOGLE_OAUTH_REDIRECT_URL,
		client_id: import.meta.env.GOOGLE_CLIENT_ID,
		access_type: 'offline',
		response_type: 'code',
		prompt: 'consent',
	};

	const qs = new URLSearchParams(options);

	return `${rootUrl}?${qs.toString()}`;
};

export default getGoogleOAuthUrl;
