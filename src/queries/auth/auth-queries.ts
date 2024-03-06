import axios from 'axios';
import baseUrl from '@/utils/api-url';
import { UserType } from '@/types/auth/auth.types';

export const loginQuery = (body: any) => {
	const { email, password } = body;

	return axios.post<{ data: UserType }>(`${baseUrl}/user/login`, {
		email,
		password,
	});
};

export const registerQuery = (body: any) => {
	const { email, password, firstName, lastName, mobile } = body;

	return axios.post<{ data: UserType }>(`${baseUrl}/user/register`, {
		email,
		password,
		first_name: firstName,
		last_name: lastName,
		mobile,
	});
};

export const logoutQuery = (body: any) => {
	const { token } = body;

	return axios.post<any>(
		`${baseUrl}/user/logout`,
		{},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};
