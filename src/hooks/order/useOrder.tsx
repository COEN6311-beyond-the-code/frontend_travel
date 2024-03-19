import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	cancelOrderQuery,
	getAgentReportQuery,
	getOrderListQuery,
	paymentOrderQuery,
	placeOrderQuery,
} from '@/queries/order/order-queries';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth/auth-context';

const useOrder = () => {
	const queryClient = useQueryClient();
	const { currentUser } = useContext(AuthContext);

	const placeOrder = useMutation({
		mutationFn: placeOrderQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['orderList', 'agentReport'],
			});
		},
	});

	const paymentOrder = useMutation({
		mutationFn: paymentOrderQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['orderList', 'agentReport'],
			});
		},
	});

	const cancelOrder = useMutation({
		mutationFn: cancelOrderQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['orderList'],
			});
		},
	});

	const orderList = useQuery({
		queryFn: getOrderListQuery,
		queryKey: ['orderList'],
		enabled: !!currentUser,
	});

	const agentReport = useQuery({
		queryFn: getAgentReportQuery,
		queryKey: ['agentReport'],
		enabled: !!currentUser?.userInfo.isAgent,
	});

	return {
		placeOrder,
		paymentOrder,
		cancelOrder,
		orderList,
		agentReport,
	};
};

export default useOrder;
