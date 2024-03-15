import { useMutation, useQuery } from '@tanstack/react-query';
import { placeOrderQuery } from '@/queries/order/order-queries';

const useOrder = () => {
	const placeOrder = useMutation({
		mutationFn: placeOrderQuery,
	});

	return {
		placeOrder,
	};
};

export default useOrder;
