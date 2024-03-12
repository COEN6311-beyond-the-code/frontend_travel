import axios from 'axios';
import baseUrl from '@/utils/api-url';
import Cookies from 'js-cookie';
import {
	ActivityFormType,
	FlightFormType,
	HotelFormType,
	PackageFormType,
	Product,
} from '@/types/product/product';
import { ProductKeys } from '@/data/packages';

export const getAllProductsQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.get<{ data: Product[] }>(`${baseUrl}/product/allProduct`, {
		headers: {
			Authorization: token,
		},
	});
};

export const getAllAgentProductsQuery = (body: any) => {
	const token = Cookies.get('token');

	return axios.get<{ data: Product[] }>(
		`${baseUrl}/product/allProduct/agent`,
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const queryProduct = (body: any) => {
	const token = Cookies.get('token');
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
	const token = Cookies.get('token');
	const { queryKey } = body;

	const { id } = queryKey[1];

	return axios.get<{ data: Product }>(`${baseUrl}/product/package?id=${id}`, {
		headers: {
			Authorization: token,
		},
	});
};

const uploadFile = async (formData: FormData): Promise<string> => {
	try {
		const response = await fetch(`${baseUrl}/uploadapp/upload`, {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error('File upload failed');
		}

		const result = await response.json();
		// Assuming the server responds with JSON that includes the URL of the uploaded file.
		return result.data.image_url;
	} catch (error) {
		console.error('Error uploading file:', error);
		throw error;
	}
};

export const createPackageQuery = async (body: PackageFormType) => {
	const token = Cookies.get('token');

	const formData = new FormData();
	formData.append('image', body.imageSrc[0]);

	const imageUrl = await uploadFile(formData);

	return axios.post<{ data: Product }>(
		`${baseUrl}/product/package/insert`,
		{
			name: body.name,
			description: body.description,
			price: body.price,
			image_src: imageUrl,
			image_alt: body.imageAlt,
			features: body.features.split(';'),
			items: [body.flight, body.hotel, body.activity].filter(
				item => item !== null,
			),
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const updatePackageQuery = async (body: PackageFormType) => {
	const token = Cookies.get('token');
	let imageUrl = '';

	if (typeof body.imageSrc === 'string') {
		imageUrl = body.imageSrc;
	} else {
		const formData = new FormData();
		formData.append('image', body.imageSrc);
		imageUrl = await uploadFile(formData);
	}

	return axios.post<{ data: Product }>(
		`${baseUrl}/product/package/update`,
		{
			id: body.id,
			name: body.name,
			description: body.description,
			price: body.price,
			image_src: imageUrl,
			features: body.features.split(';'),
			items: [body.flight, body.hotel, body.activity].filter(
				item => item !== null,
			),
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const createFlightQuery = async (body: FlightFormType) => {
	const token = Cookies.get('token');

	const formData = new FormData();
	formData.append('image', body.imageSrc[0]);

	const imageUrl = await uploadFile(formData);

	return axios.post<{ data: Product }>(
		`${baseUrl}/product/item/insert`,
		{
			type: '1',
			name: body.name,
			description: body.description,
			price: body.price,
			start_date: body.startDate,
			end_date: body.endDate,
			image_src: imageUrl,
			flight_number: body.flightNumber,
			seat_class: body.seatClass,
			destination: body.destination,
			departure_time: body.departureTime,
			arrival_time: body.arrivalTime,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const updateFlightQuery = async (body: FlightFormType) => {
	const token = Cookies.get('token');
	let imageUrl = '';

	if (typeof body.imageSrc === 'string') {
		imageUrl = body.imageSrc;
	} else {
		const formData = new FormData();
		formData.append('image', body.imageSrc);
		imageUrl = await uploadFile(formData);
	}

	return axios.post<{ data: Product }>(
		`${baseUrl}/product/item/update`,
		{
			id: body.id,
			type: '1',
			name: body.name,
			description: body.description,
			price: body.price,
			start_date: body.startDate,
			end_date: body.endDate,
			image_src: imageUrl,
			flight_number: body.flightNumber,
			seat_class: body.seatClass,
			destination: body.destination,
			departure_time: body.departureTime,
			arrival_time: body.arrivalTime,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const createHotelQuery = async (body: HotelFormType) => {
	const token = Cookies.get('token');

	const formData = new FormData();
	formData.append('image', body.imageSrc[0]);

	const imageUrl = await uploadFile(formData);

	return axios.post<{ data: Product }>(
		`${baseUrl}/product/item/insert`,
		{
			type: '2',
			name: body.name,
			description: body.description,
			price: body.price,
			start_date: body.startDate,
			end_date: body.endDate,
			room: body.room,
			image_src: imageUrl,
			hotel_name: body.hotelName,
			address: body.address,
			check_in_time: body.checkInTime,
			check_out_time: body.checkOutTime,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const updateHotelQuery = async (body: HotelFormType) => {
	const token = Cookies.get('token');
	let imageUrl = '';

	if (typeof body.imageSrc === 'string') {
		imageUrl = body.imageSrc;
	} else {
		const formData = new FormData();
		formData.append('image', body.imageSrc);
		imageUrl = await uploadFile(formData);
	}

	return axios.post<{ data: Product }>(
		`${baseUrl}/product/item/update`,
		{
			id: body.id,
			type: '2',
			name: body.name,
			description: body.description,
			price: body.price,
			start_date: body.startDate,
			end_date: body.endDate,
			room: body.room,
			image_src: imageUrl,
			hotel_name: body.hotelName,
			address: body.address,
			check_in_time: body.checkInTime,
			check_out_time: body.checkOutTime,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const createActivityQuery = async (body: ActivityFormType) => {
	const token = Cookies.get('token');

	const formData = new FormData();
	formData.append('image', body.imageSrc[0]);

	const imageUrl = await uploadFile(formData);

	return axios.post<{ data: Product }>(
		`${baseUrl}/product/item/insert`,
		{
			type: '3',
			name: body.name,
			description: body.description,
			price: body.price,
			start_date: body.startDate,
			end_date: body.endDate,
			image_src: imageUrl,
			event: body.event,
			location: body.location,
			address: body.address,
			time: body.time,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};

export const updateActivityQuery = async (body: ActivityFormType) => {
	const token = Cookies.get('token');
	let imageUrl = '';

	if (typeof body.imageSrc === 'string') {
		imageUrl = body.imageSrc;
	} else {
		const formData = new FormData();
		formData.append('image', body.imageSrc);
		imageUrl = await uploadFile(formData);
	}

	return axios.post<{ data: Product }>(
		`${baseUrl}/product/item/update`,
		{
			id: body.id,
			type: '3',
			name: body.name,
			description: body.description,
			price: body.price,
			start_date: body.startDate,
			end_date: body.endDate,
			image_src: imageUrl,
			event: body.event,
			location: body.location,
			address: body.address,
			time: body.time,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
};
