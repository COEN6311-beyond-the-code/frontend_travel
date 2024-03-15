import Layout from '@/components/layout/layout';
import { useContext, useEffect, useState } from 'react';
import { CartType } from '@/types/product/product';
import PageLoader from '@/components/loaders/page-loader';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Input from '@/components/input/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutFormTypes } from '@/types/form/input.types';
import { CheckoutSchema } from '@/schema/checkout-schema';
import Spinner from '@/components/loaders/spinner';
import Button from '@/components/button/button';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/auth/auth-context';
import useCart from '@/hooks/cart/useCart';
import { nanoid } from 'nanoid';
import Cookies from 'js-cookie';

const Checkout = () => {
	const [cart, setCart] = useState<CartType | null>(null);
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const router = useRouter();
	const { currentUser } = useContext(AuthContext);
	const { getUserCart } = useCart();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CheckoutFormTypes>({
		resolver: yupResolver(CheckoutSchema),
	});

	const submitForm: SubmitHandler<CheckoutFormTypes> = async data => {
		Cookies.set('checkoutData', JSON.stringify(data));
		await router.push(`/checkout/pay`);
	};

	useEffect(() => {
		if (getUserCart.data) {
			setCart(getUserCart.data.data.data.cart);
		}
	}, [getUserCart.data]);

	useEffect(() => {
		reset({
			email: currentUser?.userInfo.email,
			phone: currentUser?.userInfo.mobile,
		});
	}, [reset, currentUser]);

	if (!cart) {
		return <PageLoader />;
	}

	return (
		<Layout title='Checkout Page' hideFooter={true}>
			<div className='bg-white flex items-center'>
				{/* Background color split screen for large screens */}
				<div
					className='fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block'
					aria-hidden='true'
				/>
				<div
					className='fixed right-0 top-0 hidden h-full w-1/2 bg-gray-50 lg:block'
					aria-hidden='true'
				/>

				<div className='relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48'>
					<h1 className='sr-only'>Order information</h1>

					<section
						aria-labelledby='summary-heading'
						className='bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16'
					>
						<div className='mx-auto max-w-lg lg:max-w-none'>
							<h2
								id='summary-heading'
								className='text-lg font-medium text-gray-900'
							>
								Order summary
							</h2>

							<ul
								role='list'
								className='divide-y divide-gray-200 text-sm font-medium text-gray-900'
							>
								{cart.items.map(product => (
									<li
										key={nanoid()}
										className='flex items-start space-x-4 py-6'
									>
										<img
											src={product.imageSrc}
											alt={product.imageAlt}
											className='h-20 w-20 flex-none rounded-md object-cover object-center'
										/>
										<div className='flex-auto space-y-1'>
											<h3>{product.name}</h3>
											<p className='text-gray-500 capitalize'>
												Category: {product.type}
											</p>
											<p className='text-gray-500'>
												{product.options}
											</p>
										</div>
										<p className='flex-none text-base font-medium'>
											$ {product.price}
										</p>
									</li>
								))}
							</ul>

							<dl className='hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block'>
								<div className='flex items-center justify-between'>
									<dt className='text-gray-600'>Subtotal</dt>
									<dd>$ {cart.price}</dd>
								</div>

								<div className='flex items-center justify-between'>
									<dt className='text-gray-600'>Taxes</dt>
									<dd>$0.00</dd>
								</div>

								<div className='flex items-center justify-between border-t border-gray-200 pt-6'>
									<dt className='text-base'>Total</dt>
									<dd className='text-base'>${cart.price}</dd>
								</div>
							</dl>

							<Popover className='fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden'>
								<div className='relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6'>
									<div className='mx-auto max-w-lg'>
										<Popover.Button className='flex w-full items-center py-6 font-medium focus-visible:outline-none'>
											<span className='mr-auto text-base'>
												Total
											</span>
											<span className='mr-2 text-base'>
												$ {cart.price}
											</span>
											<ChevronUpIcon
												className='h-5 w-5 text-gray-500'
												aria-hidden='true'
											/>
										</Popover.Button>
									</div>
								</div>

								<Transition.Root as={Fragment}>
									<div>
										<Transition.Child
											as={Fragment}
											enter='transition-opacity ease-linear duration-300'
											enterFrom='opacity-0'
											enterTo='opacity-100'
											leave='transition-opacity ease-linear duration-300'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
										>
											<Popover.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
										</Transition.Child>

										<Transition.Child
											as={Fragment}
											enter='transition ease-in-out duration-300 transform'
											enterFrom='translate-y-full'
											enterTo='translate-y-0'
											leave='transition ease-in-out duration-300 transform'
											leaveFrom='translate-y-0'
											leaveTo='translate-y-full'
										>
											<Popover.Panel className='relative bg-white px-4 py-6 sm:px-6'>
												<dl className='mx-auto max-w-lg space-y-6'>
													<div className='flex items-center justify-between'>
														<dt className='text-gray-600'>
															Subtotal
														</dt>
														<dd>$320.00</dd>
													</div>

													<div className='flex items-center justify-between'>
														<dt className='text-gray-600'>
															Taxes
														</dt>
														<dd>$26.80</dd>
													</div>
												</dl>
											</Popover.Panel>
										</Transition.Child>
									</div>
								</Transition.Root>
							</Popover>
						</div>
					</section>

					<form
						className='px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16'
						onSubmit={handleSubmit(submitForm)}
					>
						<div className='mx-auto max-w-lg lg:max-w-none'>
							<section aria-labelledby='contact-info-heading'>
								<h2
									id='contact-info-heading'
									className='text-lg font-medium text-gray-900'
								>
									Contact information
								</h2>

								<p className='mt-3 text-md text-gray-600'>
									Confirm your email and phone number so we
									can send updates about your order.
								</p>

								<div className='mt-5' />

								<Input
									type='email'
									label='Email address'
									placeholder='johndoe@example.com'
									id='email'
									register={register}
									errors={errors}
								/>

								<Input
									type='text'
									label='Phone number'
									placeholder='+1336662739'
									id='phone'
									register={register}
									errors={errors}
								/>

								<Input
									type='date'
									label='Departure date'
									placeholder='dd/mm/yyyy'
									id='departureDate'
									register={register}
									errors={errors}
								/>

								<Input
									type='date'
									label='End date'
									placeholder='dd/mm/yyyy'
									id='endDate'
									register={register}
									errors={errors}
								/>
							</section>

							<div className='mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between'>
								<Button
									extraClasses='w-full max-w-sm flex justify-center border border-transparent px-4
								py-2 text-sm shadow-sm sm:order-last sm:ml-6 sm:w-auto'
								>
									{isCheckingOut && <Spinner />}
									Continue
								</Button>
								<p className='mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left'>
									You won't be charged until the next step.
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default Checkout;
