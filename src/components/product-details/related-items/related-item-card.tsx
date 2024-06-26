import { Product } from '@/types/product/product';
import Link from 'next/link';

const RelatedItemCard = ({ product }: { product: Product }) => {
	return (
		<div>
			<Link href={`/item/${product.type}/${product.id}`}>
				<div className='relative'>
					<div className='relative h-72 w-full overflow-hidden rounded-lg'>
						<img
							src={product.imageSrc}
							alt={product.imageAlt}
							className='h-full w-full object-cover object-center'
						/>
					</div>
					<div className='relative mt-4'>
						<h3 className='text-sm font-medium text-gray-900'>
							{product.name}
						</h3>
						<p className='mt-1 text-sm text-gray-500'>
							Included: {product.options}
						</p>
					</div>
					<div className='absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4'>
						<div
							aria-hidden='true'
							className='absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50'
						/>
						<p className='relative text-lg font-semibold text-white'>
							$ {product.price}
						</p>
					</div>
				</div>
			</Link>
			<div className='mt-6'>
				<Link
					href={`/item/${product.type}/${product.id}`}
					className='cursor-pointer relative flex items-center justify-center rounded-md border
				border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 capitalize'
				>
					View {product.type}
					<span className='sr-only'>, {product.name}</span>
				</Link>
			</div>
		</div>
	);
};

export default RelatedItemCard;
