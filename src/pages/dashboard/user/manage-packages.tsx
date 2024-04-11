import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { agentNavigation, userNavigation } from '@/data/dashboard';
import ManagePackagesList from '@/components/dashboard/user/manage-packages/manage-packages-list';
import useAuth from '@/hooks/auth/useAuth';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/auth/auth.types';
import toCamelCase from '@/utils/camel-case';
import PageLoader from '@/components/loaders/page-loader';

const ManagePackages = () => {
	const { getUserProfile } = useAuth();
	const [user, setUser] = useState<UserType | null>(null);

	const { data } = getUserProfile;

	useEffect(() => {
		if (data) {
			setUser(toCamelCase(data.data.data) as UserType);
		}
	}, [data]);

	if (!data || !user) {
		return <PageLoader />;
	}

	return (
		<Layout title='Manage Packages' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={userNavigation} user={user}>
				<ManagePackagesList />
			</Dashboard>
		</Layout>
	);
};

export default ManagePackages;
