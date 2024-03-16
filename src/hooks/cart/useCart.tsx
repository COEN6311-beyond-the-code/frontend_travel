import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	addToCartQuery,
	cartCheckoutQuery,
	deleteItemFromCartQuery,
	getUserCartQuery,
	packageCheckoutQuery,
} from '@/queries/cart/cart-queries';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth/auth-context';

const useCart = () => {
	const queryClient = useQueryClient();
	const { currentUser } = useContext(AuthContext);

	const getUserCart = useQuery({
		queryFn: getUserCartQuery,
		queryKey: ['getUserCart'],
		enabled: !!currentUser,
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

	const cartCheckout = useMutation({
		mutationFn: cartCheckoutQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getUserCart'],
			});
		},
	});

	const packageCheckout = useMutation({
		mutationFn: packageCheckoutQuery,
	});

	return {
		getUserCart,
		addToCart,
		deleteItemFromCart,
		cartCheckout,
		packageCheckout,
	};
};

export default useCart;
