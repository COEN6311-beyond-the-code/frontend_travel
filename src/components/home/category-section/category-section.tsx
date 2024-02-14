import Link from 'next/link';

const CategorySection = () => {
	return (
		<section
			aria-labelledby='category-heading'
			className='bg-gray-50 lg:mt-44 xl:-mt-10'
		>
			<div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
				<div className='sm:flex sm:items-baseline sm:justify-between'>
					<h2
						id='category-heading'
						className='text-2xl font-bold tracking-tight text-gray-900'
					>
						Browse by Category
					</h2>
					<Link
						href='/search'
						className='hidden text-sm font-semibold text-ct-deepPink hover:opacity-80 sm:block'
					>
						Browse all packages
						<span aria-hidden='true'> &rarr;</span>
					</Link>
				</div>

				<div className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8'>
					<div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2'>
						<img
							src='/images/airplane.jpg'
							alt='Concordia travel flights package deal'
							className='object-cover object-center group-hover:opacity-75'
						/>
						<div
							aria-hidden='true'
							className='bg-gradient-to-b from-transparent to-black opacity-50'
						/>
						<div className='flex items-end p-6'>
							<div>
								<h3 className='font-semibold text-white'>
									<Link href='/flights'>
										<span className='absolute inset-0' />
										Flights
									</Link>
								</h3>
								<p
									aria-hidden='true'
									className='mt-1 text-sm text-white'
								>
									Browse now
								</p>
							</div>
						</div>
					</div>
					<div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
						<img
							src='/images/hotel.jpg'
							alt='Concordia travel hotel package deal'
							className='object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full'
						/>
						<div
							aria-hidden='true'
							className='bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0'
						/>
						<div className='flex items-end p-6 sm:absolute sm:inset-0'>
							<div>
								<h3 className='font-semibold text-white'>
									<Link href='/hotels'>
										<span className='absolute inset-0' />
										Hotels
									</Link>
								</h3>
								<p
									aria-hidden='true'
									className='mt-1 text-sm text-white'
								>
									Browse now
								</p>
							</div>
						</div>
					</div>
					<div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
						<img
							src='/images/activity.jpg'
							alt='Concordia travel activity package deal'
							className='object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full'
						/>
						<div
							aria-hidden='true'
							className='bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0'
						/>
						<div className='flex items-end p-6 sm:absolute sm:inset-0'>
							<div>
								<h3 className='font-semibold text-white'>
									<Link href='/activities'>
										<span className='absolute inset-0' />
										Activities
									</Link>
								</h3>
								<p
									aria-hidden='true'
									className='mt-1 text-sm text-white'
								>
									Browse now
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 sm:hidden'>
					<a
						href='#'
						className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500'
					>
						Browse all categories
						<span aria-hidden='true'> &rarr;</span>
					</a>
				</div>
			</div>
		</section>
	);
};

export default CategorySection;
