import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	cancelOrderQuery,
	getAgentReportQuery,
	getOrderListQuery,
	paymentOrderQuery,
	placeOrderQuery,
} from '@/queries/order/order-queries';

const useOrder = () => {
	const queryClient = useQueryClient();
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
	});

	const agentReport = useQuery({
		queryFn: getAgentReportQuery,
		queryKey: ['agentReport'],
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
