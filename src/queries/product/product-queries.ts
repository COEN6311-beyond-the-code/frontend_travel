import axios from 'axios';
import baseUrl from '@/utils/api-url';
import Cookies from 'js-cookie';
import { Product } from '@/types/product/product';
import { ProductKeys } from '@/data/packages';

const token = Cookies.get('token');

export const getAllProductsQuery = (body: any) => {
	return axios.get<{ data: Product[] }>(`${baseUrl}/product/allProduct`, {
		headers: {
			Authorization: token,
		},
	});
};

export const queryProduct = (body: any) => {
	const { queryKey } = body;

	const { type, id } = queryKey[1];

	const productKey = ProductKeys[type as keyof typeof ProductKeys];

	return axios.get<{ data: Product }>(
		`${baseUrl}/product/item?type=${productKey}&id=${id}`,
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const queryPackage = (body: any) => {
	const { queryKey } = body;

	const { id } = queryKey[1];

	return axios.get<{ data: Product }>(`${baseUrl}/product/package?id=${id}`, {
		headers: {
			Authorization: token,
		},
	});
};
