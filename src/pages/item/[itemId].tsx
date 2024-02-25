import { useRouter } from 'next/router';
import PageLoader from '@/components/loaders/page-loader';
import Layout from '@/components/layout/layout';

import { Disclosure, Tab } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils/classNames';
import { products } from '@/data/packages';
import RelatedItems from '@/components/product-details/related-items/related-items';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product/product';

const item = {
	name: '7 day France trip',
	price: 1200,
	imageSrc: '/images/flights/trip 1.jpg',
	imageAlt: '7 day France trip package.',
	description: `Explore the beautiful country of France with our 7 day package deal. Enjoy a relaxing flight, a comfy hotel and some fun activities. Come with friends and family to enjoy the experience of a lifetime`,
	details: [
		{
			name: 'Features',
			items: [
				'Enjoy one of the best flight',
				'The hotel is located in the heart of the city',
				'Enjoy the best meals',
				'Meet great people at the rock climbing event',
			],
		},
		{
			name: 'Flight Details',
			items: [
				'Flight number: SKW138',
				'Seat: 17A',
				'Class: Economy',
				'Departure: 19:55',
				'Arrival: 22:15',
			],
		},
		{
			name: 'Hotel Details',
			items: [
				'Hotel name: Grand Hotel Europa',
				'Room: Standard',
				'Check-in: 15:00',
				'Check-out: 10:00',
			],
		},
		{
			name: 'Activity Details',
			items: [
				'Event: Rock climbing',
				'Location: Summit Climbing Gym',
				'Address: 123 Johnson Ave.',
				'Date: Friday, July 28, 2023',
				'Time: 16:00',
			],
		},
	],
};

const ItemDetails = () => {
	const [item, setItem] = useState<Product | null>(null);
	const router = useRouter();
	const { itemId } = router.query;

	useEffect(() => {
		if (itemId) {
			const product = products.find(
				product => product.id === parseInt(itemId as string),
			);
			if (product) {
				setItem(product);
			}
		}
	}, [itemId]);

	if (!item) {
		return <PageLoader />;
	}

	return (
		<Layout title='Item details'>
			<main className='mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8'>
				<div className='mx-auto max-w-2xl lg:max-w-none'>
					{/* Product */}
					<div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
						{/* Image gallery */}
						<Tab.Group as='div' className='flex flex-col-reverse'>
							<Tab.Panels className='aspect-h-1 aspect-w-1 w-full'>
								<Tab.Panel>
									<img
										src={item.imageSrc}
										alt={item.imageAlt}
										className='h-full w-full object-cover object-center sm:rounded-lg'
									/>
								</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>

						{/* Item info */}
						<div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
							<h1 className='text-3xl font-bold tracking-tight text-gray-900 capitalize'>
								{item.name}
							</h1>

							<div className='mt-3'>
								<h2 className='sr-only'>Product information</h2>
								<p className='text-3xl tracking-tight text-gray-900'>
									$ {item.price}
								</p>
							</div>

							<div className='mt-6'>
								<h3 className='sr-only'>Description</h3>

								<div className='space-y-6 text-base text-gray-700'>
									{item.description}
								</div>
							</div>

							<form className='mt-6'>
								<div className='mt-10 flex'>
									<button
										type='submit'
										className='flex max-w-xs flex-1 items-center justify-center rounded-md border
                                        border-transparent bg-ct-deepPink px-8 py-3 text-base font-medium text-white
                                        hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ct-deepPink
                                        focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'
									>
										{item.type === 'package'
											? 'Book now'
											: 'Add to package'}
									</button>
								</div>
							</form>

							<section
								aria-labelledby='details-heading'
								className='mt-12'
							>
								<h2 id='details-heading' className='sr-only'>
									Additional details
								</h2>

								<div className='divide-y divide-gray-200 border-t'>
									{item.details.map(detail => (
										<Disclosure as='div' key={detail.name}>
											{({ open }) => (
												<>
													<h3>
														<Disclosure.Button className='group relative flex w-full items-center justify-between py-6 text-left'>
															<span
																className={classNames(
																	open
																		? 'text-ct-deepPink'
																		: 'text-gray-900',
																	'text-sm font-medium',
																)}
															>
																{detail.name}
															</span>
															<span className='ml-6 flex items-center'>
																{open ? (
																	<MinusIcon
																		className='block h-6 w-6 text-indigo-400 group-hover:text-indigo-500'
																		aria-hidden='true'
																	/>
																) : (
																	<PlusIcon
																		className='block h-6 w-6 text-gray-400 group-hover:text-gray-500'
																		aria-hidden='true'
																	/>
																)}
															</span>
														</Disclosure.Button>
													</h3>
													<Disclosure.Panel
														as='div'
														className='prose prose-sm pb-6'
													>
														<ul role='list'>
															{detail.items.map(
																item => (
																	<li
																		key={
																			item
																		}
																	>
																		{item}
																	</li>
																),
															)}
														</ul>
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>
									))}
								</div>
							</section>
						</div>
					</div>

					<section
						aria-labelledby='related-heading'
						className='mt-10 border-t border-gray-200 px-4 py-16 sm:px-0'
					>
						<h2
							id='related-heading'
							className='text-xl font-bold text-gray-900'
						>
							Other popular packages
						</h2>

						<RelatedItems products={products} />
					</section>
				</div>
			</main>
		</Layout>
	);
};

export default ItemDetails;
