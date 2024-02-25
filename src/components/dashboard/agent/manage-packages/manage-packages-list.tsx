import { useState } from 'react';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { products } from '@/data/packages';
import ConfirmCancel from '@/components/message/confirm-cancel';
import { Product } from '@/types/product/product';
import Link from 'next/link';
import { Order } from '@/types/dashboard/orders';

const ManagePackagesList = () => {
	const [itemToCancel, setItemToCancel] = useState<Order | Product | null>(
		null,
	);
	const [open, setOpen] = useState(false);

	const handleCancel = () => {
		if (itemToCancel) {
			console.log('Cancel', itemToCancel);
			setItemToCancel(null);
		}
	};

	return (
		<main>
			<div className='mx-auto max-w-7xl sm:px-2 lg:px-8'>
				<div className='mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
					<h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
						Manage packages
					</h1>
					<p className='mt-2 text-sm text-gray-500'>
						Manage all packages, flights, hotels and activities
						here.
					</p>
				</div>
			</div>

			<section aria-labelledby='recent-heading' className='mt-16'>
				<h2 id='recent-heading' className='sr-only'>
					Manage packages
				</h2>
				<div className='mx-auto max-w-7xl sm:px-2 lg:px-8'>
					<div className='mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
						<div className='border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border'>
							<div className='flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6'>
								<dl className='grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2'>
									<div>
										<dt className='font-medium text-gray-900'>
											Total items
										</dt>
										<dd className='mt-1 text-gray-500'>
											{products.length}
										</dd>
									</div>
								</dl>

								<div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4'>
									<Link
										href='/dashboard/agent/create-item'
										className='flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
									>
										<span>Create Item</span>
									</Link>
								</div>
							</div>

							{/* Products */}
							<h4 className='sr-only'>Items</h4>
							<ul
								role='list'
								className='divide-y divide-gray-200'
							>
								{products.map(product => (
									<li key={product.id} className='p-4 sm:p-6'>
										<div className='flex items-center sm:items-start'>
											<Link href={`/item/${product.id}`}>
												<div className='h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40 hover:opacity-80'>
													<img
														src={product.imageSrc}
														alt={product.imageAlt}
														className='h-full w-full object-cover object-center'
													/>
												</div>
											</Link>
											<div className='ml-6 flex-1 text-sm'>
												<div className='font-medium text-gray-900 sm:flex sm:justify-between'>
													<h5>{product.name}</h5>
													<p className='mt-2 sm:mt-0'>
														$ {product.price}
													</p>
												</div>
												<p className='hidden text-gray-500 sm:mt-2 sm:block'>
													{product.description}
												</p>
												<div className='mt-8'>
													<span className='capitalize bg-gray-700 text-white px-4 py-1 rounded-full'>
														{product.type}
													</span>
												</div>
											</div>
										</div>

										<div className='mt-6 sm:flex sm:justify-between'>
											<div className='flex items-center'>
												<CalendarDaysIcon
													className='h-5 w-5 text-gray-500'
													aria-hidden='true'
												/>
												<p className='ml-2 text-sm font-medium text-gray-500'>
													Created on{' '}
													<time dateTime='12th Feb, 2024'>
														{new Date().toDateString()}
													</time>
												</p>
											</div>

											<div className='mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0'>
												<div className='flex flex-1 justify-center'>
													<Link
														href={`/dashboard/agent/item/${product.id}/update?type=${product.type}`}
														className='whitespace-nowrap text-black hover:opacity-80'
													>
														Update item
													</Link>
												</div>
												<div className='flex flex-1 justify-center pl-4'>
													<div
														onClick={() => {
															setItemToCancel(
																product,
															);
															setOpen(true);
														}}
														className='whitespace-nowrap text-red-600 hover:opacity-80 cursor-pointer'
													>
														Delete item
													</div>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<ConfirmCancel
				title='Delete item'
				message='Are you sure you want to delete this item? This action cannot be undone.'
				open={open}
				setOpen={setOpen}
				handleConfirm={handleCancel}
				setItemToCancel={setItemToCancel}
			/>
		</main>
	);
};

export default ManagePackagesList;
