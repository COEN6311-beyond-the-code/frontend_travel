import ItemForm from '@/components/dashboard/agent/package-form/item-form';
import Layout from '@/components/layout/layout';
import { agentNavigation } from '@/data/dashboard';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PackageForm from '@/components/dashboard/agent/package-form/package-form';
import useAuth from '@/hooks/auth/useAuth';
import { UserType } from '@/types/auth/auth.types';
import toCamelCase from '@/utils/camel-case';
import PageLoader from '@/components/loaders/page-loader';

const UpdateItem = () => {
	const { getUserProfile } = useAuth();
	const [user, setUser] = useState<UserType | null>(null);

	const { data } = getUserProfile;

	useEffect(() => {
		if (data) {
			setUser(toCamelCase(data.data.data) as UserType);
		}
	}, [data]);

	const router = useRouter();

	useEffect(() => {
		console.log(router.query.type);
	}, [router]);

	if (!router.query.type) {
		return null;
	}

	if (!data || !user) {
		return <PageLoader />;
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
					<ItemForm mode='edit' type={router.query.type as string} />
				)}
			</Dashboard>
		</Layout>
	);
};

export default UpdateItem;
