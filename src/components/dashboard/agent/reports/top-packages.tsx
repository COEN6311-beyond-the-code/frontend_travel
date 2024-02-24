import { products } from '@/data/packages';
import ProductCard from '@/components/search/product-card/product-card';

const TopPackages = () => {
	return (
		<div className='mt-20 mb-14'>
			<h1 className='text-xl font-bold'>Top Performing Packages</h1>
			<div className='max-w-screen-lg mt-4 mb-10 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
				{products.slice(0, 3).map(item => {
					return <ProductCard product={item} key={item.id} />;
				})}
			</div>
		</div>
	);
};

export default TopPackages;
