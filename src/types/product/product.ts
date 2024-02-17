export interface Product {
	id: number;
	name: string;
	href: string;
	price: number;
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
