import Layout from '@/components/layout/layout';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product/product';
import { useRouter } from 'next/router';
import { products } from '@/data/packages';
import PageLoader from '@/components/loaders/page-loader';

const Checkout = () => {
	const [item, setItem] = useState<Product | null>(null);
	const router = useRouter();
	const { itemId } = router.query;

	useEffect(() => {
		if (itemId) {
			const product = products.find(
				product => product.id === parseInt(itemId as string),
			);
			if (product) {
				setItem(product);
			}
		}
	}, [itemId]);

	if (!item) {
		return <PageLoader />;
	}
	return (
		<Layout title='Checkout Page'>
			<h1>Checkout</h1>
		</Layout>
	);
};

export default Checkout;
