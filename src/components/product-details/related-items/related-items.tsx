import RelatedItemCard from '@/components/product-details/related-items/related-item-card';
import { Product } from '@/types/product/product';
import useProduct from '@/hooks/product/useProduct';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';

const RelatedItems = () => {
	const router = useRouter();
	const { itemId, itemType } = router.query;
	const { getAllProducts } = useProduct();
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		if (getAllProducts.data) {
			const randomProducts = getAllProducts.data.data.data
				.filter(
					product =>
						product.type === itemType &&
						product.id !== parseInt(itemId as string),
				)
				.sort(() => Math.random() - Math.random())
				.slice(0, 4);
			setProducts(randomProducts);
		}

		return () => {
			setProducts([]);
		};
	}, [getAllProducts.data]);

	return (
		<div className='mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
			{products.map(product => (
				<RelatedItemCard key={nanoid()} product={product} />
			))}
		</div>
	);
};

export default RelatedItems;
