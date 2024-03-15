import { useEffect, useState } from 'react';
import { CalendarDaysIcon, PlusIcon } from '@heroicons/react/20/solid';
import ConfirmCancel from '@/components/message/confirm-cancel';
import { Product } from '@/types/product/product';
import Link from 'next/link';
import useProduct from '@/hooks/product/useProduct';
import PageLoader from '@/components/loaders/page-loader';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

const ManagePackagesList = () => {
	const [itemToCancel, setItemToCancel] = useState<any>(null);
	const [open, setOpen] = useState(false);
	const { getAllAgentProducts, deletePackage, deleteItem } = useProduct();
	const [products, setProducts] = useState<Product[]>([]);
	const router = useRouter();

	const handleCancel = () => {
		if (itemToCancel) {
			if (itemToCancel.type === 'package') {
				deletePackage.mutate({
					id: itemToCancel.id,
				});
			} else {
				deleteItem.mutate({
					id: itemToCancel.id,
					type: itemToCancel.type,
				});
			}
			setItemToCancel(null);
		}
	};

	useEffect(() => {
		if (deleteItem.data || deletePackage.data) {
			setOpen(false);
		}
	}, [deleteItem.data, deletePackage.data]);

	useEffect(() => {
		if (getAllAgentProducts.data) {
			setProducts(getAllAgentProducts.data.data.data);
		}
	}, [getAllAgentProducts.data]);

	if (!getAllAgentProducts.data) {
		return <PageLoader />;
	}

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
						{products.length > 0 ? (
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
											className='flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ct-deepPink focus:ring-offset-2'
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
										<li
											key={nanoid()}
											className='p-4 sm:p-6'
										>
											<div className='flex items-center sm:items-start'>
												<Link
													href={`/item/${product.id}`}
												>
													<div className='h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40 hover:opacity-80'>
														<img
															src={
																product.imageSrc
															}
															alt={
																product.imageAlt
															}
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
															{new Date(
																product.createAt as string,
															).toDateString()}
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
						) : (
							<div className='text-center mt-[25%]'>
								<svg
									className='mx-auto h-12 w-12 text-gray-400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									aria-hidden='true'
								>
									<path
										vectorEffect='non-scaling-stroke'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
									/>
								</svg>
								<h3 className='mt-2 text-sm font-semibold text-gray-900'>
									No packages or items
								</h3>
								<p className='mt-1 text-sm text-gray-500'>
									Get started by creating a new package or
									item.
								</p>
								<div className='mt-6'>
									<button
										type='button'
										className='inline-flex items-center rounded-md bg-ct-deepPink px-3 py-2
											text-sm font-semibold text-white shadow-sm hover:opacity-80'
										onClick={async () => {
											await router.push(
												'/dashboard/agent/create-item',
											);
										}}
									>
										<PlusIcon
											className='-ml-0.5 mr-1.5 h-5 w-5'
											aria-hidden='true'
										/>
										New Project
									</button>
								</div>
							</div>
						)}
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
				isLoading={deleteItem.isPending || deletePackage.isPending}
			/>
		</main>
	);
};

export default ManagePackagesList;
