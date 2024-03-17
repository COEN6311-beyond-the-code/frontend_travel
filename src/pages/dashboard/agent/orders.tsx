import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { agentNavigation } from '@/data/dashboard';
import AgentOrdersTable from '@/components/dashboard/agent/agent-orders-table';
import { orders } from '@/data/orders';
import useAuth from '@/hooks/auth/useAuth';
import useOrder from '@/hooks/order/useOrder';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/auth/auth.types';
import toCamelCase from '@/utils/camel-case';
import PageLoader from '@/components/loaders/page-loader';
import { Order } from '@/types/dashboard/orders';

const Orders = () => {
	const { getUserProfile } = useAuth();
	const [user, setUser] = useState<UserType | null>(null);
	const { orderList, cancelOrder } = useOrder();
	const [orders, setOrders] = useState<Order[]>([]);

	const { data } = getUserProfile;

	useEffect(() => {
		if (data) {
			setUser(toCamelCase(data.data.data) as UserType);
		}
	}, [data]);

	useEffect(() => {
		if (orderList && orderList.data) {
			setOrders(toCamelCase(orderList.data.data.data) as Order[]);
		}
	}, [orderList.data]);

	if (!data || !user) {
		return <PageLoader />;
	}

	return (
		<Layout title='Orders' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation} user={user}>
				<h1 className='text-xl font-bold'>All Orders</h1>
				<p>Find below all orders that have been placed by customers.</p>
				<AgentOrdersTable orders={orders} />
			</Dashboard>
		</Layout>
	);
};

export default Orders;
