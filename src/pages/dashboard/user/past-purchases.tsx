import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';
import Layout from '@/components/layout/layout';
import OrdersTable from '@/components/dashboard/user/ordersTable';
import { orders } from '@/data/orders';

const PastPurchases = () => {
	const user = {
		firstName: 'John',
		lastName: 'Doe',
		mobile: '0245556677',
		userType: 'user',
	};

	return (
		<Layout title='Past Purchases' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={userNavigation} user={user}>
				<h1 className='text-xl font-bold'>All Orders</h1>
				<p>Find below all completed purchases.</p>
				<OrdersTable
					orders={orders.filter(order => order.status === 'complete')}
				/>
			</Dashboard>
		</Layout>
	);
};

export default PastPurchases;
