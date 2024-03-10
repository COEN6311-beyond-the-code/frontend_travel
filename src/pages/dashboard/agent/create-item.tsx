import Layout from '@/components/layout/layout';
import { agentNavigation } from '@/data/dashboard';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { classNames } from '@/utils/classNames';
import { useEffect, useState } from 'react';
import PackageTabs from '@/components/dashboard/agent/package-form/package-tabs';
import PackageForm from '@/components/dashboard/agent/package-form/package-form';
import ItemForm from '@/components/dashboard/agent/package-form/item-form';
import useAuth from '@/hooks/auth/useAuth';
import { UserType } from '@/types/auth/auth.types';
import toCamelCase from '@/utils/camel-case';
import PageLoader from '@/components/loaders/page-loader';

const CreateItem = () => {
	const [currentTab, setCurrentTab] = useState('Package');
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
		<Layout title='Create Item' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation} user={user}>
				<h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
					Create Item
				</h1>

				<PackageTabs
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/>

				<div className='mt-10' />

				<div>
					{currentTab === 'Package' && <PackageForm mode='create' />}
					{currentTab === 'Item' && <ItemForm mode='create' />}
				</div>
			</Dashboard>
		</Layout>
	);
};

export default CreateItem;
