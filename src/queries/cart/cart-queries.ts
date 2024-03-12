import Cookies from 'js-cookie';
import baseUrl from '@/utils/api-url';
import { CartType } from '@/types/product/product';
import axios from 'axios';

export const getUserCartQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.get<{ data: { cart: CartType } }>(`${baseUrl}/cart/query`, {
		headers: {
			Authorization: token,
		},
	});
};

export const addToCartQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.post<{ data: { cart: CartType } }>(
		`${baseUrl}/cart/addItem`,
		{
			type: body.type,
			id: body.id,
			number: body.number,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const deleteItemFromCartQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.post<{ data: { cart: CartType } }>(
		`${baseUrl}/cart/deleteItem`,
		{
			cartItemId: body.cartItemId,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};
