import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';
import Layout from '@/components/layout/layout';
import Profile from '@/components/dashboard/shared/settings/profile';
import Account from '@/components/dashboard/shared/settings/account';
import DeleteAccount from '@/components/dashboard/shared/settings/delete-account';
import useAuth from '@/hooks/auth/useAuth';
import PageLoader from '@/components/loaders/page-loader';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/auth/auth.types';
import toCamelCase from '@/utils/camel-case';

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
			<Dashboard navigationItems={userNavigation} user={user}>
				<Profile user={user} />
				<Account user={user} />
				<DeleteAccount user={user} />
			</Dashboard>
		</Layout>
	);
};

export default ProfileSettings;
