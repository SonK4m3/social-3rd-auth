import { combineReducers } from '@reduxjs/toolkit';
import { authApi, blogApi } from './api';
import authSlice from '@/store/authSlice';

const rootReducer = combineReducers({
	[blogApi.reducerPath]: blogApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	['auth']: authSlice,
});

export { rootReducer };
