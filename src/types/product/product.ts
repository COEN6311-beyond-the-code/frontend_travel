export interface Product {
	id: number;
	name: string;
	href: string;
	price: number;
	description: string;
	options: string;
	imageSrc: string;
	imageAlt: string;
	type: 'packages' | 'flights' | 'hotels' | 'activities';
}
