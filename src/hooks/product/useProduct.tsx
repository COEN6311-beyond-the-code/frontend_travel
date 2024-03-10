import { useQuery } from '@tanstack/react-query';
import {
	getAllProductsQuery,
	queryPackage,
	queryProduct,
} from '@/queries/product/product-queries';

const useProduct = (productId?: string, productType?: string) => {
	const getAllProducts = useQuery({
		queryFn: getAllProductsQuery,
		queryKey: ['getAllProducts'],
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

	return {
		getAllProducts,
		getProduct,
		getPackage,
	};
};

export default useProduct;
