import { useRouter } from 'next/router';
import PageLoader from '@/components/loaders/page-loader';
import Layout from '@/components/layout/layout';

import { Disclosure, Tab } from '@headlessui/react';
import {
	InformationCircleIcon,
	MinusIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';
import { classNames } from '@/utils/classNames';
import RelatedItems from '@/components/product-details/related-items/related-items';
import React, { useContext, useEffect, useState } from 'react';
import { Product } from '@/types/product/product';
import useProduct from '@/hooks/product/useProduct';
import useCart from '@/hooks/cart/useCart';
import Message from '@/components/message/message';
import Spinner from '@/components/loaders/spinner';
import { nanoid } from 'nanoid';
import Cookies from 'js-cookie';
import { AuthContext } from '@/context/auth/auth-context';
import StarRating from '@/components/product-details/rating/nonedit-rating';

const ItemDetails = () => {
	const [item, setItem] = useState<Product | null>(null);
	const [show, setShow] = useState(false);
	const [showSignInMessage, setShowSignInMessage] = useState(false);
	const [isInCart, setIsInCart] = useState(false);
	const [setCartId, setSetCartId] = useState<number | null>(null);
	const router = useRouter();
	const { currentUser } = useContext(AuthContext);
	const { itemId, itemType } = router.query;
	const { getProduct, getPackage } = useProduct(
		itemId as string,
		itemType as string,
	);
	const { addToCart, getUserCart, deleteItemFromCart } = useCart();

	useEffect(() => {
		if (getProduct.data) {
			setItem(getProduct.data.data.data);
		} else if (getPackage.data) {
			setItem(getPackage.data.data.data);
		}
	}, [getProduct.data, getPackage.data]);

	useEffect(() => {
		if (getUserCart.data && itemId && itemType) {
			const cart = getUserCart.data.data.data.cart;
			const isItemInCart = cart.items.find(
				item => item.id + item.type === (itemId as string) + itemType,
			);
			if (isItemInCart) {
				setSetCartId(isItemInCart.cartItemId);
			}
			setIsInCart(!!isItemInCart);
		}
	}, [getUserCart.data, itemId, itemType]);

	useEffect(() => {
		if (addToCart.data) {
			setShow(true);
		}
	}, [addToCart.data]);

	const handleAddToCart = () => {
		if (!currentUser) {
			setShowSignInMessage(true);
			return;
		} else {
			if (itemId && itemType !== 'package') {
				if (isInCart) {
					deleteItemFromCart.mutate({
						cartItemId: itemId,
					});
				} else {
					addToCart.mutate({
						type: itemType,
						id: itemId,
						number: 1,
					});
				}
				Cookies.remove('packageToPurchase');
			} else if (itemId && itemType === 'package') {
				Cookies.set('packageToPurchase', itemId as string);
				router.push(`/checkout`).then();
			}
		}
	};

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

								{item.rating !== undefined &&
									item.rating_count !== undefined && (
										<StarRating
											rating={item.rating}
											rating_count={item.rating_count}
											isEdit={false}
										/>
									)}
							</div>

							<div className='mt-6'>
								<div className='mt-10 flex'>
									<button
										type='submit'
										className='flex max-w-xs flex-1 items-center justify-center rounded-md border
                                        border-transparent bg-ct-deepPink px-8 py-3 text-base font-medium text-white
                                        hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ct-deepPink
                                        focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'
										onClick={handleAddToCart}
									>
										{(addToCart.isPending ||
											deleteItemFromCart.isPending) && (
											<Spinner />
										)}

										{itemType !== 'package' &&
											(isInCart
												? 'Remove from custom package'
												: 'Add to custom package')}

										{itemType === 'package' &&
											'Purchase Package'}
									</button>
								</div>
							</div>

							<section
								aria-labelledby='details-heading'
								className='mt-12'
							>
								<h2 id='details-heading' className='sr-only'>
									Additional details
								</h2>

								<div className='divide-y divide-gray-200 border-t'>
									{item.details.map(detail => (
										<Disclosure as='div' key={nanoid()}>
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
																		className='block h-6 w-6 text-gray-400 group-hover:text-gray-500'
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
																		key={nanoid()}
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

						<RelatedItems />
					</section>
				</div>
			</main>

			<Message
				title='Package updated'
				subtitle='This item has been added to your custom package'
				show={show}
				setShow={setShow}
			/>

			<Message
				title='Sign in required'
				subtitle='You need to be signed in to perform this action'
				show={showSignInMessage}
				setShow={setShowSignInMessage}
				Icon={InformationCircleIcon}
			/>
		</Layout>
	);
};

export default ItemDetails;
