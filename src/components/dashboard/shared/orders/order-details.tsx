import { Dispatch, FC, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils/classNames';
import { inter } from '@/utils/fonts';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { Product } from '@/types/product/product';

interface IProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	activeOrder: Product[];
	setActiveOrder: Dispatch<SetStateAction<Product[] | null>>;
}

const OrderDetails: FC<IProps> = ({
	open,
	setOpen,
	activeOrder,
	setActiveOrder,
}) => {
	if (!activeOrder) {
		return null;
	}
	// Calculate Subtotal
	const subtotal = activeOrder.reduce(
		(acc, product) =>
			acc +
			(typeof product.price === 'number'
				? product.price
				: parseFloat(product.price)),
		0,
	);

	// Calculate Taxes
	const taxes = parseFloat((subtotal * 0.15).toFixed(2));
	const total = parseFloat((subtotal + taxes).toFixed(2));
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as='div'
				className={classNames(inter.className, 'relative z-50')}
				onClose={setOpen}
			>
				<div className='fixed inset-0' />

				<div className='fixed inset-0 overflow-hidden'>
					<div className='absolute inset-0 overflow-hidden'>
						<div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
							<Transition.Child
								as={Fragment}
								enter='transform transition ease-in-out duration-500 sm:duration-700'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transform transition ease-in-out duration-500 sm:duration-700'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
									<div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
										<div className='px-4 sm:px-6'>
											<div className='flex items-start justify-between'>
												<Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
													Order Details
												</Dialog.Title>
												<div className='ml-3 flex h-7 items-center'>
													<button
														type='button'
														className='relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ct-deepPink focus:ring-offset-2'
														onClick={() => {
															setOpen(false);
															setActiveOrder(
																null,
															);
														}}
													>
														<span className='absolute -inset-2.5' />
														<span className='sr-only'>
															Close panel
														</span>
														<XMarkIcon
															className='h-6 w-6'
															aria-hidden='true'
														/>
													</button>
												</div>
											</div>
										</div>
										<div className='relative mt-6 flex-1 px-4 sm:px-6'>
											<div className='mt-3'>
												<div className='flow-root'>
													<ul
														role='list'
														className='my-6 divide-y divide-gray-200'
													>
														{activeOrder.map(
															product => (
																<li
																	key={nanoid()}
																	className='flex py-6'
																>
																	<div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
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

																	<div className='ml-4 flex flex-1 flex-col'>
																		<div>
																			<div className='flex justify-between text-base font-medium text-gray-900'>
																				<h3>
																					<Link
																						href={`/item/${product.type}/${product.id}`}
																						onClick={() =>
																							setOpen(
																								false,
																							)
																						}
																					>
																						{
																							product.name
																						}
																					</Link>
																				</h3>
																				<p className='ml-4'>
																					${' '}
																					{
																						product.price
																					}
																				</p>
																			</div>
																			<p className='mt-1 text-sm text-gray-500'>
																				{
																					product.options
																				}
																			</p>
																		</div>
																		<div className='flex flex-1 items-end justify-between text-sm'>
																			<p className='text-gray-500 capitalize'>
																				{
																					product.type
																				}
																			</p>
																		</div>
																	</div>
																</li>
															),
														)}
													</ul>
												</div>
											</div>

											{activeOrder.length > 0 && (
												<dl className='hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block'>
													<div className='flex items-center justify-between'>
														<dt className='text-gray-600'>
															Subtotal
														</dt>
														<dd>$ {subtotal}</dd>
													</div>

													<div className='flex items-center justify-between'>
														<dt className='text-gray-600'>
															Taxes
														</dt>
														<dd>$ {taxes}</dd>
													</div>

													<div className='flex items-center justify-between border-t border-gray-200 pt-6'>
														<dt className='text-base'>
															Total
														</dt>
														<dd className='text-base'>
															$ {total}
														</dd>
													</div>
												</dl>
											)}
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default OrderDetails;
