import Button from '@/components/button/button';

const Landing = () => {
	return (
		<header>
			<div className='h-full xl:h-screen sm:mt-10 lg:mt-20 pt-16 xl:pb-48 xl:pt-40'>
				<div className='relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8'>
					<div className='sm:max-w-lg lg:max-w-xl xl:max-w-lg'>
						<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
							Browse exclusive package deals.
						</h1>
						<p className='mt-4 text-xl text-gray-500'>
							Our exclusive package deals are designed to keep you
							safe and comfortable. We have a wide range of
							packages to suit your needs.
						</p>
					</div>
					<div>
						<div className='mt-10'>
							{/* Decorative image grid */}
							<div
								aria-hidden='true'
								className='hidden xl:block pointer-events-none lg:absolute lg:top-15% lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl'
							>
								<div className='absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-[35%] xl:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
									<div className='flex items-center space-x-6 lg:space-x-8'>
										<div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
											<div className='h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100'>
												<img
													src='/images/landing-1.jpg'
													alt=''
													className='h-full w-full object-cover object-center'
												/>
											</div>
											<div className='h-64 w-44 overflow-hidden rounded-lg'>
												<img
													src='/images/landing-2.jpg'
													alt=''
													className='h-full w-full object-cover object-center'
												/>
											</div>
										</div>
										<div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
											<div className='h-64 w-44 overflow-hidden rounded-lg'>
												<img
													src='/images/landing-3.jpg'
													alt=''
													className='h-full w-full object-cover object-center'
												/>
											</div>
											<div className='h-64 w-44 overflow-hidden rounded-lg'>
												<img
													src='/images/landing-4.jpg'
													alt=''
													className='h-full w-full object-cover object-center'
												/>
											</div>
											<div className='h-64 w-44 overflow-hidden rounded-lg'>
												<img
													src='/images/landing-5.jpg'
													alt=''
													className='h-full w-full object-cover object-center'
												/>
											</div>
										</div>
										<div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
											<div className='h-64 w-44 overflow-hidden rounded-lg'>
												<img
													src='/images/landing-6.jpg'
													alt=''
													className='h-full w-full object-cover object-center'
												/>
											</div>
											<div className='h-64 w-44 overflow-hidden rounded-lg'>
												<img
													src='/images/landing-7.jpg'
													alt=''
													className='h-full w-full object-cover object-center'
												/>
											</div>
										</div>
									</div>
								</div>
							</div>

							<Button link='/search?type=package'>
								Browse packages
							</Button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Landing;
