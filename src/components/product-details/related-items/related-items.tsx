import RelatedItemCard from '@/components/product-details/related-items/related-item-card';
import { Product } from '@/types/product/product';

const RelatedItems = ({ products }: { products: Product[] }) => {
	return (
		<div className='mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
			{products
				.filter(product => product.id > 4)
				.map(product => (
					<RelatedItemCard key={product.id} product={product} />
				))}
		</div>
	);
};

export default RelatedItems;
