import Link from 'next/link';

const TrendingPackages = () => {
	const favorites = [
		{
			id: 1,
			name: 'Black Basic Tee',
			price: '$32',
			href: '#',
			imageSrc: '/images/activity package 1.jpg',
			imageAlt: "Model wearing women's black cotton crewneck tee.",
		},
		{
			id: 2,
			name: 'Off-White Basic Tee',
			price: '$32',
			href: '#',
			imageSrc: '/images/hotel package 1.jpg',
			imageAlt: "Model wearing women's off-white cotton crewneck tee.",
		},
		{
			id: 3,
			name: 'Mountains Artwork Tee',
			price: '$36',
			href: '#',
			imageSrc: '/images/travel package 1.jpg',
			imageAlt:
				"Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
		},
	];

	return (
		<section aria-labelledby='favorites-heading'>
			<div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
				<div className='sm:flex sm:items-baseline sm:justify-between'>
					<h2
						id='favorites-heading'
						className='text-2xl font-bold tracking-tight text-gray-900'
					>
						Our Favorites
					</h2>
					<a
						href='#'
						className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
					>
						Browse all favorites
						<span aria-hidden='true'> &rarr;</span>
					</a>
				</div>

				<div className='mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8'>
					{favorites.map(favorite => (
						<div key={favorite.id} className='group relative'>
							<div className='h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto'>
								<img
									src={favorite.imageSrc}
									alt={favorite.imageAlt}
									className='h-full w-full object-cover object-center'
								/>
							</div>
							<h3 className='mt-4 text-base font-semibold text-gray-900'>
								<Link href={favorite.href}>
									<span className='absolute inset-0' />
									{favorite.name}
								</Link>
							</h3>
							<p className='mt-1 text-sm text-gray-500'>
								{favorite.price}
							</p>
						</div>
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
