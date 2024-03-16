import Cookies from 'js-cookie';
import baseUrl from '@/utils/api-url';
import axios from 'axios';
import { OrderResponse } from '@/types/dashboard/orders';

export const placeOrderQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.post<{ data: OrderResponse }>(
		`${baseUrl}/order/place`,
		{
			departure_date: body.departureDate,
			end_date: body.endDate,
			email: body.email,
			phone: body.phone,
			packageId: body.packageId,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const paymentOrderQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.post(
		`${baseUrl}/order/payment`,
		{
			amount: body.amount,
			order_number: body.orderNumber,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};
