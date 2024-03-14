import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi, blogApi } from './state/api';
import { rootReducer } from './state';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefault) => getDefault().concat(blogApi.middleware, authApi.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>,
);
