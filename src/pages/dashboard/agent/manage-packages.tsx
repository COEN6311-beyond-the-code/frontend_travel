import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { agentNavigation } from '@/data/dashboard';

const ManagePackages = () => {
	return (
		<Layout title='Manage Packages' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation}>
				<h1>Manage Packages</h1>
			</Dashboard>
		</Layout>
	);
};

export default ManagePackages;
