import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { agentNavigation } from '@/data/dashboard';
import ManagePackagesList from '@/components/dashboard/agent/manage-packages/manage-packages-list';

const ManagePackages = () => {
	const user = {
		firstName: 'John',
		lastName: 'Doe',
		mobile: '0245556677',
		userType: 'agent',
	};

	return (
		<Layout title='Manage Packages' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation} user={user}>
				<ManagePackagesList />
			</Dashboard>
		</Layout>
	);
};

export default ManagePackages;
