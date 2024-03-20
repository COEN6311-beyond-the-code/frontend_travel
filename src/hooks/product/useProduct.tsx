import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createActivityQuery,
	createFlightQuery,
	createHotelQuery,
	createPackageQuery,
	deleteItemQuery,
	deletePackageQuery,
	getAllAgentProductsQuery,
	getAllProductsQuery,
	getTrendingProductsQuery,
	queryPackage,
	queryProduct,
	updateActivityQuery,
	updateFlightQuery,
	updateHotelQuery,
	updatePackageQuery,
} from '@/queries/product/product-queries';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth/auth-context';

const useProduct = (productId?: string, productType?: string) => {
	const queryClient = useQueryClient();
	const { currentUser } = useContext(AuthContext);

	const getAllProducts = useQuery({
		queryFn: getAllProductsQuery,
		queryKey: ['getAllProducts'],
	});

	const getTrendingProducts = useQuery({
		queryFn: getTrendingProductsQuery,
		queryKey: ['getTrendingProducts'],
	});

	const getAllAgentProducts = useQuery({
		queryFn: getAllAgentProductsQuery,
		queryKey: ['getAllAgentProducts'],
		enabled: !!currentUser,
	});

	const getProduct = useQuery({
		queryFn: queryProduct,
		queryKey: ['getProduct', { id: productId, type: productType }],
		enabled: !!productId && !!productType && productType !== 'package',
	});

	const getPackage = useQuery({
		queryFn: queryPackage,
		queryKey: ['getPackage', { id: productId }],
		enabled: !!productId && productType === 'package',
	});

	const createPackage = useMutation({
		mutationFn: createPackageQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getAllProducts', 'getAllAgentProducts'],
			});
		},
	});

	const updatePackage = useMutation({
		mutationFn: updatePackageQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getAllProducts', 'getAllAgentProducts'],
			});
		},
	});

	const deletePackage = useMutation({
		mutationFn: deletePackageQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getAllAgentProducts'],
			});
		},
	});

	const createFlight = useMutation({
		mutationFn: createFlightQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getAllProducts', 'getAllAgentProducts'],
			});
		},
	});

	const updateFlight = useMutation({
		mutationFn: updateFlightQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getAllProducts', 'getAllAgentProducts'],
			});
		},
	});

	const createHotel = useMutation({
		mutationFn: createHotelQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getAllProducts', 'getAllAgentProducts'],
			});
		},
	});

	const updateHotel = useMutation({
		mutationFn: updateHotelQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getAllProducts', 'getAllAgentProducts'],
			});
		},
	});

	const createActivity = useMutation({
		mutationFn: createActivityQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getAllProducts', 'getAllAgentProducts'],
			});
		},
	});

	const updateActivity = useMutation({
		mutationFn: updateActivityQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getAllProducts', 'getAllAgentProducts'],
			});
		},
	});

	const deleteItem = useMutation({
		mutationFn: deleteItemQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getAllProducts', 'getAllAgentProducts'],
			});
		},
	});

	return {
		getAllProducts,
		getProduct,
		getPackage,
		createFlight,
		updateFlight,
		createHotel,
		updateHotel,
		createActivity,
		updateActivity,
		deleteItem,
		createPackage,
		updatePackage,
		deletePackage,
		getAllAgentProducts,
		getTrendingProducts,
	};
};

export default useProduct;
