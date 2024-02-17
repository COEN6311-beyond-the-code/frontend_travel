import Layout from '@/components/layout/layout';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product/product';
import { useRouter } from 'next/router';
import { products } from '@/data/packages';
import PageLoader from '@/components/loaders/page-loader';

const Checkout = () => {
	const [cart, setCart] = useState<Product[]>([]);

	if (cart.length === 1) {
		return <PageLoader />;
	}

	return (
		<Layout title='Checkout Page'>
			<h1>Checkout</h1>
		</Layout>
	);
};

export default Checkout;
