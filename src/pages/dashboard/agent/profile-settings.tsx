import Dashboard from '@/components/dashboard/shared/dashboard';
import { agentNavigation } from '@/data/dashboard';
import Layout from '@/components/layout/layout';
import Account from '@/components/dashboard/shared/settings/account';
import Profile from '@/components/dashboard/shared/settings/profile';

const ProfileSettings = () => {
	const user = {
		firstName: 'John',
		lastName: 'Doe',
		mobile: '0245556677',
		userType: 'agent',
	};

	return (
		<Layout title='Profile Settings' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation} user={user}>
				<Profile user={user} />
				<Account />
			</Dashboard>
		</Layout>
	);
};

export default ProfileSettings;
