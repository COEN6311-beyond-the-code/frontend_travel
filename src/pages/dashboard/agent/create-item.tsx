import Layout from '@/components/layout/layout';
import { agentNavigation } from '@/data/dashboard';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { classNames } from '@/utils/classNames';
import { useState } from 'react';
import PackageTabs from '@/components/dashboard/agent/package-form/package-tabs';
import PackageForm from '@/components/dashboard/agent/package-form/package-form';
import ItemForm from '@/components/dashboard/agent/package-form/item-form';

const CreateItem = () => {
	const user = {
		firstName: 'John',
		lastName: 'Doe',
		mobile: '0245556677',
		userType: 'agent',
	};

	const [currentTab, setCurrentTab] = useState('Package');

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
					{currentTab === 'Package' && <PackageForm />}
					{currentTab === 'Item' && <ItemForm mode='create' />}
				</div>
			</Dashboard>
		</Layout>
	);
};

export default CreateItem;
