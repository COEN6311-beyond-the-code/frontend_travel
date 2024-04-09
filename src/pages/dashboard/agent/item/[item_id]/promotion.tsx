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
import PromotionForm from '@/components/dashboard/agent/package-form/promotion-form';

const SetPromotion = () => {
	const { getUserProfile } = useAuth();
	const [user, setUser] = useState<UserType | null>(null);

	const { data } = getUserProfile;

	useEffect(() => {
		if (data) {
			setUser(toCamelCase(data.data.data) as UserType);
		}
	}, [data]);

	const router = useRouter();

	if (!router.query.type) {
		return null;
	}

	if (!data || !user) {
		return <PageLoader />;
	}

	return (
		<Layout title='Set Promotion' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation} user={user}>
				<h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
					Promotion Setting
				</h1>

				<div className='mt-10' />

				<PromotionForm />
			</Dashboard>
		</Layout>
	);
};

export default SetPromotion;
