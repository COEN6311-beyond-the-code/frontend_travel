import {
	Dispatch,
	FC,
	Fragment,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils/classNames';
import { inter } from '@/utils/fonts';
import Link from 'next/link';
import { CartType, Product } from '@/types/product/product';
import useCart from '@/hooks/cart/useCart';
import { nanoid } from 'nanoid';
import Spinner from '@/components/loaders/spinner';
import Cookies from 'js-cookie';

interface IProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const PackageCart: FC<IProps> = ({ open, setOpen }) => {
	const [cart, setCart] = useState<CartType | null>(null);
	const { getUserCart, deleteItemFromCart } = useCart();
	const [itemToDelete, setItemToDelete] = useState<Product | null>(null);

	useEffect(() => {
		if (getUserCart.data) {
			setCart(getUserCart.data.data.data.cart);
		}
	}, [getUserCart.data]);

	useEffect(() => {
		if (deleteItemFromCart.data) {
			setItemToDelete(null);
		}
	}, [deleteItemFromCart.data]);

	if (!cart) {
		return null;
	}

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as='div' className='relative z-50' onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter='ease-in-out duration-500'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in-out duration-500'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div
					className={classNames(
						inter.className,
						'fixed inset-0 overflow-hidden',
					)}
				>
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
									<div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
										<div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
											<div className='flex items-start justify-between'>
												<Dialog.Title className='text-lg font-medium text-gray-900'>
													Custom Package
												</Dialog.Title>
												<div className='ml-3 flex h-7 items-center'>
													<button
														type='button'
														className='relative -m-2 p-2 text-gray-400 hover:text-gray-500 focus-visible:outline-ct-deepPink'
														onClick={() =>
															setOpen(false)
														}
													>
														<span className='absolute -inset-0.5' />
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

											<div className='mt-8'>
												<div className='flow-root'>
													{cart?.items.length! > 0 ? (
														<ul
															role='list'
															className='-my-6 divide-y divide-gray-200'
														>
															{cart?.items.map(
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
																							href={`/item/${product.id}`}
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

																				<div className='flex'>
																					<button
																						type='button'
																						className='font-medium text-ct-deepPink hover:opacity-80'
																						onClick={() => {
																							setItemToDelete(
																								product,
																							);
																							deleteItemFromCart.mutate(
																								{
																									cartItemId:
																										product.cartItemId,
																								},
																							);
																						}}
																					>
																						{itemToDelete &&
																						product.type +
																							product.id ===
																							itemToDelete?.type +
																								itemToDelete?.id &&
																						deleteItemFromCart.isPending ? (
																							<Spinner />
																						) : (
																							'Remove'
																						)}
																					</button>
																				</div>
																			</div>
																		</div>
																	</li>
																),
															)}
														</ul>
													) : (
														<div className='flex flex-col items-center justify-center mt-[50%]'>
															<img
																className='w-20 h-20 opacity-70'
																src='/images/empty-box.png'
																alt='Empty package'
															/>
															<p className='text-center text-gray-500'>
																Your custom
																package is empty
															</p>
															<Link
																href={'/search'}
																className='text-center text-white bg-ct-deepPink mt-4 px-3 py-3 rounded-md hover:opacity-80'
																onClick={() =>
																	setOpen(
																		false,
																	)
																}
															>
																Search for items
															</Link>
														</div>
													)}
												</div>
											</div>
										</div>

										{cart?.items.length > 0 && (
											<div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
												<div className='flex justify-between text-base font-medium text-gray-900'>
													<p>Subtotal</p>
													<p>${cart.price}</p>
												</div>
												<p className='mt-0.5 text-sm text-gray-500'>
													Taxes calculated at
													checkout.
												</p>
												<div className='mt-6'>
													<Link
														href='/checkout'
														className='flex items-center justify-center rounded-md border border-transparent
                                                    bg-ct-deepPink px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-80'
														onClick={() => {
															Cookies.remove(
																'packageToPurchase',
															);
														}}
													>
														Checkout
													</Link>
												</div>
												<div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
													<p>
														or{' '}
														<button
															type='button'
															className='font-medium text-ct-deepPink hover:opacity-80'
															onClick={() =>
																setOpen(false)
															}
														>
															Continue Shopping
															<span aria-hidden='true'>
																{' '}
																&rarr;
															</span>
														</button>
													</p>
												</div>
											</div>
										)}
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

export default PackageCart;
