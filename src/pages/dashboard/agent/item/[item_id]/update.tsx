import ItemForm from '@/components/dashboard/agent/package-form/item-form';
import Layout from '@/components/layout/layout';
import { agentNavigation } from '@/data/dashboard';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PackageForm from '@/components/dashboard/agent/package-form/package-form';

const UpdateItem = () => {
	const user = {
		firstName: 'John',
		lastName: 'Doe',
		mobile: '0245556677',
		userType: 'agent',
	};
	const router = useRouter();

	useEffect(() => {
		console.log(router.query.type);
	}, [router]);

	if (!router.query.type) {
		return null;
	}

	return (
		<Layout title='Update Item' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation} user={user}>
				<h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
					Update Item
				</h1>

				<div className='mt-10' />

				{router.query.type === 'package' ? (
					<PackageForm mode='edit' />
				) : (
					<ItemForm mode='edit' />
				)}
			</Dashboard>
		</Layout>
	);
};

export default UpdateItem;
