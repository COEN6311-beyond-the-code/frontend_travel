import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { agentNavigation } from '@/data/dashboard';
import ReportStats from '@/components/dashboard/agent/reports/report-stats';
import AgentOrdersTable from '@/components/dashboard/agent/agent-orders-table';
import { orders } from '@/data/orders';
import TopPackages from '@/components/dashboard/agent/reports/top-packages';

const Reports = () => {
	const user = {
		firstName: 'John',
		lastName: 'Doe',
		mobile: '0245556677',
		userType: 'agent',
	};

	return (
		<Layout title='Reports' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation} user={user}>
				<h1 className='text-xl font-bold'>Reports</h1>
				<ReportStats />

				<TopPackages />

				<h1 className='text-xl font-bold'>Recent orders</h1>
				<AgentOrdersTable orders={orders} />
			</Dashboard>
		</Layout>
	);
};

export default Reports;
