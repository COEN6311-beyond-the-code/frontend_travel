import { FC } from 'react';
import { Product } from '@/types/product/product';
import Link from 'next/link';

interface IProps {
	product: Product;
}

const ProductCard: FC<IProps> = ({ product }) => {
	return (
		<Link href={`/item/${product.id}`}>
			<div className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'>
				<div className='aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96'>
					<img
						src={product.imageSrc}
						alt={product.imageAlt}
						className='h-full w-full object-cover object-center sm:h-full sm:w-full'
					/>
				</div>
				<div className='flex flex-1 flex-col space-y-2 p-4'>
					<h3 className='text-sm font-medium text-gray-900'>
						<span aria-hidden='true' className='absolute inset-0' />
						{product.name}
					</h3>
					<p className='text-sm text-gray-500 line-clamp-2'>
						{product.description}
					</p>
					<div className='flex flex-1 flex-col justify-end'>
						<p className='text-sm italic text-gray-500'>
							{product.options}
						</p>
						<p className='text-base font-medium text-gray-900'>
							$ {product.price}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
