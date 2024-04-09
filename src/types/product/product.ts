export interface Product {
	id: number;
	name: string;
	href?: string;
	price: string | number;
	description: string;
	options: string;
	imageSrc: string;
	imageAlt?: string;
	createAt?: string;
	start_date?: string;
	end_date?: string;
	type: 'package' | 'flight' | 'hotel' | 'activity';
	rating?: number;
	rating_count?: number;
	details: ProductDetails[];
}

export interface ProductDetails {
	id?: number;
	name: string;
	price?: number;
	items: string[];
	type: 'package' | 'flight' | 'hotel' | 'activity';
}

export interface ItemFormType {
	id?: number;
	name: string;
	description: string;
	imageSrc: any;
	imageAlt?: string;
}

export interface FlightFormType extends ItemFormType {
	flightNumber: string;
	seatClass: 'economy' | 'business' | 'first';
	price: number;
	startDate: string;
	endDate: string;
	destination: string;
	departureTime: string;
	arrivalTime: string;
}

export interface HotelFormType extends ItemFormType {
	hotelName: string;
	room: 'single' | 'double' | 'suite' | 'penthouse';
	price: number;
	address: string;
	startDate: string;
	endDate: string;
	checkInTime: string;
	checkOutTime: string;
}

export interface ActivityFormType extends ItemFormType {
	startDate: string;
	price: number;
	endDate: string;
	event: string;
	location: string;
	address: string;
	time: string;
}

export interface PromotionFormType {
	browseTimes: number;
	windowsTime: number;
	waitTime: number;
}

export interface PackageFormType extends ItemFormType {
	flight: any;
	hotel: any;
	activity: any;
	features: string;
}

interface CartProduct extends Product {
	cartItemId: number;
}

export interface CartType {
	price: number;
	taxed: number;
	total: number;
	items: CartProduct[];
}
