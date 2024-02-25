import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';
import Layout from '@/components/layout/layout';
import Profile from '@/components/dashboard/shared/settings/profile';
import Account from '@/components/dashboard/shared/settings/account';
import DeleteAccount from '@/components/dashboard/shared/settings/delete-account';

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
				<DeleteAccount />
			</Dashboard>
		</Layout>
	);
};

export default ProfileSettings;
