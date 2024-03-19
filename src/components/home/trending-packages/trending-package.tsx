import Link from 'next/link';
import { Product } from '@/types/product/product';
import { FC } from 'react';

interface IProps {
	item: Product;
}

const TrendingPackage: FC<IProps> = ({ item }) => {
	return (
		<Link
			key={item.id}
			href={`/item/${item.type}/${item.id}`}
			className='group relative'
		>
			<div className='h-44 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto'>
				<img
					src={item.imageSrc}
					alt={item.imageAlt}
					className='h-full w-full object-cover object-center'
				/>
			</div>
			<h3 className='mt-4 text-base font-semibold text-gray-900'>
				<div>
					<span className='absolute inset-0' />
					{item.name}
				</div>
			</h3>
			<p className='mt-1 text-sm text-gray-500'>{item.price}</p>
		</Link>
	);
};

export default TrendingPackage;
