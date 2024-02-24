import ItemForm from '@/components/dashboard/agent/package-form/item-form';
import Layout from '@/components/layout/layout';
import { agentNavigation } from '@/data/dashboard';
import Dashboard from '@/components/dashboard/shared/dashboard';

const UpdateItem = () => {
	const user = {
		firstName: 'John',
		lastName: 'Doe',
		mobile: '0245556677',
		userType: 'agent',
	};

	return (
		<Layout title='Update Item' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation} user={user}>
				<h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
					Update Item
				</h1>

				<div className='mt-10' />

				<ItemForm mode='edit' />
			</Dashboard>
		</Layout>
	);
};

export default UpdateItem;
