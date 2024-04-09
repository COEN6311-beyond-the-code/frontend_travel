import Link from 'next/link';
import TrendingPackage from '@/components/home/trending-packages/trending-package';
import useProduct from '@/hooks/product/useProduct';

const TrendingPackages = () => {
	const { getTrendingProducts } = useProduct();

	return (
		<section aria-labelledby='favorites-heading'>
			<div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
				<div className='sm:flex sm:items-baseline sm:justify-between'>
					<h2
						id='favorites-heading'
						className='text-2xl font-bold tracking-tight text-gray-900'
					>
						Trending packages
					</h2>
					<Link
						href='/search'
						className='hidden text-sm font-semibold text-ct-deepPink hover:opacity-80 sm:block'
					>
						Browse all packages
						<span aria-hidden='true'> &rarr;</span>
					</Link>
				</div>

				<div className='mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8'>
					{getTrendingProducts.data?.data.data.map(item => (
						<TrendingPackage item={item} key={item.id} />
					))}
				</div>

				<div className='mt-6 sm:hidden'>
					<Link
						href='/search'
						className='block text-sm font-semibold text-ct-deepPink hover:opacity-80'
					>
						Browse all packages
						<span aria-hidden='true'> &rarr;</span>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default TrendingPackages;
