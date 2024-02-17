import Dashboard from '@/components/dashboard/shared/dashboard';
import { userNavigation } from '@/data/dashboard';
import Layout from '@/components/layout/layout';

const ProfileSettings = () => {
	return (
		<Layout title='Profile Settings' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={userNavigation}>
				<h1>Profile Setting</h1>
			</Dashboard>
		</Layout>
	);
};

export default ProfileSettings;
