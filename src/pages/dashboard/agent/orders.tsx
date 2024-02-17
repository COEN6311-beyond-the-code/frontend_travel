import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { agentNavigation } from '@/data/dashboard';

const Orders = () => {
	return (
		<Layout title='Orders' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation}>
				<h1>Orders</h1>
			</Dashboard>
		</Layout>
	);
};

export default Orders;
