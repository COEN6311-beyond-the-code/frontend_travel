import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';
import Layout from '@/components/layout/layout';

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
				<h1>Past Purchases</h1>
			</Dashboard>
		</Layout>
	);
};

export default PastPurchases;
