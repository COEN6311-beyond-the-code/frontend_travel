import { Order } from '@/types/dashboard/orders';

export const orders: Order[] = [
	{
		id: 1,
		name: 'Order 1',
		description: 'Order 1 description',
		price: 1000,
		status: 'pending',
		createdAt: '2021-07-01',
		user: {
			id: 1,
			name: 'John Doe',
			email: 'johndoe@gmail.com',
		},
	},
	{
		id: 2,
		name: 'Order 2',
		description: 'Order 2 description',
		price: 2000,
		status: 'pending',
		createdAt: '2021-07-02',
		user: {
			id: 1,
			name: 'John Doe',
			email: 'johndoe@gmail.com',
		},
	},
	{
		id: 3,
		name: 'Order 3',
		description: 'Order 3 description',
		price: 3000,
		status: 'pending',
		createdAt: '2021-07-03',
		user: {
			id: 2,
			name: 'Jane Doe',
			email: 'janedoe@gmail.com',
		},
	},
	{
		id: 4,
		name: 'Order 4',
		description: 'Order 4 description',
		price: 4000,
		status: 'complete',
		createdAt: '2021-07-04',
		user: {
			id: 3,
			name: 'Candace Parker',
			email: 'candace@gmail.com',
		},
	},
	{
		id: 5,
		name: 'Order 5',
		description: 'Order 5 description',
		price: 5000,
		status: 'complete',
		createdAt: '2021-07-05',
		user: {
			id: 3,
			name: 'Candace Parker',
			email: 'candace@gmail.com',
		},
	},
];
