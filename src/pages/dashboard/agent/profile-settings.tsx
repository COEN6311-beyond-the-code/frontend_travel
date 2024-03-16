import Dashboard from '@/components/dashboard/shared/dashboard';
import { agentNavigation } from '@/data/dashboard';
import Layout from '@/components/layout/layout';
import Account from '@/components/dashboard/shared/settings/account';
import Profile from '@/components/dashboard/shared/settings/profile';
import useAuth from '@/hooks/auth/useAuth';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/auth/auth.types';
import toCamelCase from '@/utils/camel-case';
import PageLoader from '@/components/loaders/page-loader';

const ProfileSettings = () => {
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
		<Layout title='Profile Settings' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation} user={user}>
				<Profile user={user} />
				<Account user={user} />
			</Dashboard>
		</Layout>
	);
};

export default ProfileSettings;
