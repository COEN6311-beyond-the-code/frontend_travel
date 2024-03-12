import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	addToCartQuery,
	deleteItemFromCartQuery,
	getUserCartQuery,
} from '@/queries/cart/cart-queries';

const useCart = () => {
	const queryClient = useQueryClient();

	const getUserCart = useQuery({
		queryFn: getUserCartQuery,
		queryKey: ['getUserCart'],
	});

	const addToCart = useMutation({
		mutationFn: addToCartQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getUserCart'],
			});
		},
	});

	const deleteItemFromCart = useMutation({
		mutationFn: deleteItemFromCartQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getUserCart'],
			});
		},
	});

	return {
		getUserCart,
		addToCart,
		deleteItemFromCart,
	};
};

export default useCart;
