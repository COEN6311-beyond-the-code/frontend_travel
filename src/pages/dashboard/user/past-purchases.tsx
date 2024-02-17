import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';
import Layout from '@/components/layout/layout';

const PastPurchases = () => {
	return (
		<Layout title='Past Purchases' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={userNavigation}>
				<h1>Past Purchases</h1>
			</Dashboard>
		</Layout>
	);
};

export default PastPurchases;
