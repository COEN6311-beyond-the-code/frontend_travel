export interface Product {
	id: number;
	name: string;
	href?: string;
	price: string | number;
	description: string;
	options: string;
	imageSrc: string;
	imageAlt: string;
	type: 'package' | 'flight' | 'hotel' | 'activity';
	details: ProductDetails[];
}

export interface ProductDetails {
	name: string;
	items: string[];
	type: 'package' | 'flight' | 'hotel' | 'activity';
}

export interface ItemFormType {
	name: string;
	description: string;
	price: number;
	imageSrc: any;
	imageAlt: string;
}

export interface FlightFormType extends ItemFormType {
	flightNumber: string;
	seatClass: 'economy' | 'business' | 'first';
	startDate: string;
	endDate: string;
	destination: string;
	departureTime: string;
	arrivalTime: string;
}

export interface HotelFormType extends ItemFormType {
	hotelName: string;
	room: 'single' | 'double' | 'suite' | 'penthouse';
	address: string;
	startDate: string;
	endDate: string;
	checkInTime: string;
	checkOutTime: string;
}

export interface ActivityFormType extends ItemFormType {
	startDate: string;
	endDate: string;
	event: string;
	location: string;
	address: string;
	time: string;
}

export interface PackageFormType extends ItemFormType {
	flight: any;
	hotel: any;
	activity: any;
	type: 'package' | 'flight' | 'hotel' | 'activity';
	features: string;
}
