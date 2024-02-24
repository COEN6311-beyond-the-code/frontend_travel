export interface Order {
	id: number;
	name: string;
	description: string;
	price: number;
	status: string;
	user?: {
		id: number;
		name: string;
		email: string;
	};
	createdAt: string;
}
