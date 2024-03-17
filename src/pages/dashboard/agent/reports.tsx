import Layout from '@/components/layout/layout';
import Dashboard from '@/components/dashboard/shared/dashboard';
import { agentNavigation } from '@/data/dashboard';
import ReportStats from '@/components/dashboard/agent/reports/report-stats';
import AgentOrdersTable from '@/components/dashboard/agent/agent-orders-table';
import { orders } from '@/data/orders';
import TopPackages from '@/components/dashboard/agent/reports/top-packages';
import useAuth from '@/hooks/auth/useAuth';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/auth/auth.types';
import toCamelCase from '@/utils/camel-case';
import PageLoader from '@/components/loaders/page-loader';
import useOrder from '@/hooks/order/useOrder';
import { Order } from '@/types/dashboard/orders';
import { Report } from '@/types/dashboard/report';

const Reports = () => {
	const { getUserProfile } = useAuth();
	const [user, setUser] = useState<UserType | null>(null);
	const { orderList, agentReport } = useOrder();
	const [orders, setOrders] = useState<Order[]>([]);
	const [report, setReport] = useState<Report | null>(null);

	const { data } = getUserProfile;

	useEffect(() => {
		if (data) {
			setUser(toCamelCase(data.data.data) as UserType);
		}
	}, [data]);

	useEffect(() => {
		if (orderList && orderList.data) {
			setOrders(toCamelCase(orderList.data.data.data) as Order[]);
		}
	}, [orderList.data]);

	useEffect(() => {
		if (agentReport && agentReport.data) {
			setReport(toCamelCase(agentReport.data.data.data) as Report);
		}
	}, [agentReport.data]);

	if (!data || !user || !report) {
		return <PageLoader />;
	}

	return (
		<Layout title='Reports' hideFooter={true} hideNav={true}>
			<Dashboard navigationItems={agentNavigation} user={user}>
				<h1 className='text-xl font-bold'>Reports</h1>
				<ReportStats report={report} />

				<TopPackages topPackages={report.topPackage} />

				<h1 className='text-xl font-bold'>Recent orders</h1>
				<AgentOrdersTable orders={orders} />
			</Dashboard>
		</Layout>
	);
};

export default Reports;
