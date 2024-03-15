import { useMutation, useQuery } from '@tanstack/react-query';
import {
	paymentOrderQuery,
	placeOrderQuery,
} from '@/queries/order/order-queries';

const useOrder = () => {
	const placeOrder = useMutation({
		mutationFn: placeOrderQuery,
	});

	const paymentOrder = useMutation({
		mutationFn: paymentOrderQuery,
		// TODO: Add onSuccess to revalidate user orders
	});

	return {
		placeOrder,
		paymentOrder,
	};
};

export default useOrder;
