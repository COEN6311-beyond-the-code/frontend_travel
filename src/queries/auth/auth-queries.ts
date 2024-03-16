import axios from 'axios';
import baseUrl from '@/utils/api-url';
import { UserType } from '@/types/auth/auth.types';
import Cookies from 'js-cookie';

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
	const token = Cookies.get('token');

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

export const getProfileQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.get<{ data: UserType }>(`${baseUrl}/user/view_profile`, {
		headers: {
			Authorization: token,
		},
	});
};

export const updateProfileQuery = (body: any) => {
	const token = Cookies.get('token');
	const { firstName, lastName, mobile } = body;

	return axios.post<{ data: UserType }>(
		`${baseUrl}/user/profile_update`,
		{
			first_name: firstName,
			last_name: lastName,
			mobile,
			skip_verify: '1',
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const updateAccountQuery = (body: any) => {
	const token = Cookies.get('token');
	const { email, password } = body;

	return axios.post<{ data: UserType }>(
		`${baseUrl}/user/profile_update`,
		{
			email,
			password,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const deactivateAccountQuery = (body: any) => {
	const token = Cookies.get('token');
	const { email, password } = body;

	return axios.post<any>(
		`${baseUrl}/user/deactive`,
		{
			email,
			password,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};
