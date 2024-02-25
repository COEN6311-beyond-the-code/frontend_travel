import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';
import OrdersTable from '@/components/dashboard/user/ordersTable';
import { orders } from '@/data/orders';

const OrderHistory = () => {
	const user = {
		firstName: 'John',
		lastName: 'Doe',
		mobile: '0245556677',
		userType: 'user',
	};

	return (
		<Layout title='Order History' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={userNavigation} user={user}>
				<h1 className='text-xl font-bold'>All Orders</h1>
				<p>Find below all orders you've placed.</p>
				<OrdersTable orders={orders} />
			</Dashboard>
		</Layout>
	);
};

export default OrderHistory;
