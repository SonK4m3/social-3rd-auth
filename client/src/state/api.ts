import { RootState, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
	id: number;
	title: string;
}

export const blogApi = createApi({
	reducerPath: 'blogApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token');
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ['Posts'],
	endpoints: (builder) => ({
		getPosts: builder.query<Post[], void>({
			query: () => '/posts',
			providesTags: ['Posts'],
		}),
	}),
});

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth/signin',
				method: 'POST',
				body: credentials,
			}),
		}),
		// ... other endpoints
	}),
});

export const { useGetPostsQuery } = blogApi;
export const { useLoginMutation } = authApi;
