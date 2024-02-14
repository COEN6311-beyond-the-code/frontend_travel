import Link from 'next/link';

const TrendingPackages = () => {
	const packages = [
		{
			id: 1,
			name: 'Rock Climbing',
			price: '$60',
			href: '#',
			imageSrc: '/images/activity package 1.jpg',
			imageAlt: 'Woman climbing rock face in the desert.',
		},
		{
			id: 2,
			name: 'Hotel Transylvania',
			price: '$290',
			href: '#',
			imageSrc: '/images/hotel package 1.jpg',
			imageAlt: 'Best hotel in the world.',
		},
		{
			id: 3,
			name: 'France Flight Package',
			price: '$900',
			href: '#',
			imageSrc: '/images/travel package 1.jpg',
			imageAlt: 'Best flight package to France in January.',
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
					{packages.map(item => (
						<div key={item.id} className='group relative'>
							<div className='h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto'>
								<img
									src={item.imageSrc}
									alt={item.imageAlt}
									className='h-full w-full object-cover object-center'
								/>
							</div>
							<h3 className='mt-4 text-base font-semibold text-gray-900'>
								<Link href={item.href}>
									<span className='absolute inset-0' />
									{item.name}
								</Link>
							</h3>
							<p className='mt-1 text-sm text-gray-500'>
								{item.price}
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
