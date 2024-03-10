import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';
import OrdersTable from '@/components/dashboard/user/ordersTable';
import { orders } from '@/data/orders';
import useAuth from '@/hooks/auth/useAuth';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/auth/auth.types';
import toCamelCase from '@/utils/camel-case';
import PageLoader from '@/components/loaders/page-loader';

const OrderHistory = () => {
	const { getUserProfile } = useAuth();
	const [user, setUser] = useState<UserType | null>(null);

	const { data } = getUserProfile;

	useEffect(() => {
		if (data) {
			setUser(toCamelCase(data.data.data) as UserType);
		}
	}, [data]);

	if (!data || !user) {
		return <PageLoader />;
	}

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
