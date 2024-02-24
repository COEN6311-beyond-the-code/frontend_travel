import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';
import Layout from '@/components/layout/layout';
import Profile from '@/components/settings/profile';
import Account from '@/components/settings/account';

const ProfileSettings = () => {
	const user = {
		firstName: 'John',
		lastName: 'Doe',
		mobile: '0245556677',
		userType: 'user',
	};

	return (
		<Layout title='Profile Settings' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={userNavigation} user={user}>
				<Profile user={user} />
				<Account />
			</Dashboard>
		</Layout>
	);
};

export default ProfileSettings;
