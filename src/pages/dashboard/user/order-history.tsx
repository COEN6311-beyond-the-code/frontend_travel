import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';

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
				<h1>Order History</h1>
			</Dashboard>
		</Layout>
	);
};

export default OrderHistory;
