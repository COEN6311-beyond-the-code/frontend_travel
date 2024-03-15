import Cookies from 'js-cookie';
import baseUrl from '@/utils/api-url';
import axios from 'axios';

export const placeOrderQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.post(
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
