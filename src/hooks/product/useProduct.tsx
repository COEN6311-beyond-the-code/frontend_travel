import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createActivityQuery,
	createFlightQuery,
	createHotelQuery,
	createPackageQuery,
	getAllAgentProductsQuery,
	getAllProductsQuery,
	queryPackage,
	queryProduct,
} from '@/queries/product/product-queries';

const useProduct = (productId?: string, productType?: string) => {
	const queryClient = useQueryClient();

	const getAllProducts = useQuery({
		queryFn: getAllProductsQuery,
		queryKey: ['getAllProducts'],
	});

	const getAllAgentProducts = useQuery({
		queryFn: getAllAgentProductsQuery,
		queryKey: ['getAllAgentProducts'],
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

	const createFlight = useMutation({
		mutationFn: createFlightQuery,
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

	const createActivity = useMutation({
		mutationFn: createActivityQuery,
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
		createHotel,
		createActivity,
		createPackage,
		getAllAgentProducts,
	};
};

export default useProduct;
