import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { agentNavigation } from '@/data/dashboard';

const Reports = () => {
	return (
		<Layout title='Reports' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation}>
				<h1>Reports</h1>
			</Dashboard>
		</Layout>
	);
};

export default Reports;
