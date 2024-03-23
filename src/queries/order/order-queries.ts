import Cookies from 'js-cookie';
import baseUrl from '@/utils/api-url';
import axios from 'axios';
import { Order, OrderResponse } from '@/types/dashboard/orders';
import { Report } from '@/types/dashboard/report';

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

export const modifyOrderQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.post<{ data: OrderResponse }>(
		`${baseUrl}/order/modify`,
		{
			start_date: body.startDate,
			end_date: body.endDate,
			order_number: body.orderNumber,
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

export const getOrderListQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.get<{ data: Order[] }>(`${baseUrl}/order/views`, {
		headers: {
			Authorization: token,
		},
	});
};

export const getAgentReportQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.get<{ data: Report }>(`${baseUrl}/order/agent/report`, {
		headers: {
			Authorization: token,
		},
	});
};

export const cancelOrderQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.post<{ data: OrderResponse }>(
		`${baseUrl}/order/cancel`,
		{
			order_number: body.orderNumber,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};
