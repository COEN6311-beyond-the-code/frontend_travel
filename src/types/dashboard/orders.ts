import { Product } from '@/types/product/product';

export interface Order {
	id: number;
	orderNumber: string;
	name: string;
	description: string;
	price: number;
	status: string;
	items: Product[];
	user?: {
		id: number;
		name: string;
		email: string;
	};
	createdAt: string;
}

export interface OrderResponse {
	order_number: string;
	amount: number;
}

export interface ModifyOrder {
	startDate: string;
	endDate: string;
}
