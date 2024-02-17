import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';

const OrderHistory = () => {
	return (
		<Layout title='Order History' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={userNavigation}>
				<h1>Order History</h1>
			</Dashboard>
		</Layout>
	);
};

export default OrderHistory;
