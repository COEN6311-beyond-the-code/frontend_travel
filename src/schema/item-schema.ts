import * as yup from 'yup';

const shared = {
	name: yup.string().required('Please the item name'),
	description: yup.string().required('Please enter a description'),
	price: yup.number().required('Please enter a price'),
	imageSrc: yup.mixed().required('Please upload an image'),
};

export const PackageSchema = yup.object({
	...shared,
	flight: yup.string().required('Please select a flight'),
	hotel: yup.string().required('Please select a hotel'),
	activity: yup.string().required('Please select an activity'),
	features: yup
		.string()
		.required('Please enter the item features seperated by semicolons'),
});

export const FlightSchema = yup.object({
	...shared,
	flightNumber: yup.string().required('Please enter a flight number'),
	seatClass: yup
		.string()
		.oneOf(['economy', 'business', 'first'])
		.required('Please select a seat class'),
	startDate: yup.string().required('Please enter a start date'),
	endDate: yup.string().required('Please enter an end date'),
	destination: yup.string().required('Please enter a destination'),
	departureTime: yup.string().required('Please enter a departure time'),
	arrivalTime: yup.string().required('Please enter an arrival time'),
});

export const HotelSchema = yup.object({
	...shared,
	hotelName: yup.string().required('Please enter a hotel name'),
	room: yup
		.string()
		.oneOf(['single', 'double', 'suite', 'penthouse'])
		.required('Please enter a room number'),
	address: yup.string().required('Please enter an address'),
	startDate: yup.string().required('Please enter a start date'),
	endDate: yup.string().required('Please enter an end date'),
	checkInTime: yup.string().required('Please enter a check-in date'),
	checkOutTime: yup.string().required('Please enter a check-out date'),
});

export const ActivitySchema = yup.object({
	...shared,
	startDate: yup.string().required('Please enter a start date'),
	endDate: yup.string().required('Please enter an end date'),
	event: yup.string().required('Please enter an event'),
	location: yup.string().required('Please enter a location'),
	address: yup.string().required('Please enter an address'),
	time: yup.string().required('Please enter a time'),
});
