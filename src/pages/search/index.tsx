import { Fragment, useState, useEffect } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/utils/classNames';
import Layout from '@/components/layout/layout';
import { inter } from '@/utils/fonts';
import { products } from '@/data/packages';
import ProductCard from '@/components/search/product-card/product-card';
import { useRouter } from 'next/router';
import { Product } from '@/types/product/product';
import PriceRange from '@/components/search/price-range/price-range';
import Input from '@/components/input/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchSchema } from '@/schema/search-schema';
import Button from '@/components/button/button';

const filters = [
	{
		id: 'productType',
		name: 'Product',
		type: 'checkbox',
		options: [
			{ value: 'package', label: 'Packages' },
			{ value: 'flight', label: 'Flights' },
			{ value: 'hotel', label: 'Hotels' },
			{ value: 'activity', label: 'Activities' },
		],
	},
];

const Search = () => {
	const rangeMin = 100;
	const rangeMax = 5000;
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [activeProductTypeFilters, setActiveProductTypeFilters] = useState<
		string[]
	>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

	const [priceValues, setPriceValues] = useState<{
		price_min: number;
		price_max: number;
	}>({
		price_min: rangeMin,
		price_max: rangeMax,
	});

	const handleProductTypeFilterChange = (value: string) => {
		let updatedFilters;
		if (activeProductTypeFilters.includes(value)) {
			updatedFilters = activeProductTypeFilters.filter(
				filter => filter !== value,
			);
		} else {
			updatedFilters = [...activeProductTypeFilters, value];
		}
		setActiveProductTypeFilters(updatedFilters);

		// Update the URL query params to reflect all active filters
		router
			.push({ pathname: '/search', query: { type: updatedFilters } })
			.then();
	};

	const router = useRouter();

	useEffect(() => {
		if (router.query.type) {
			setActiveProductTypeFilters(
				Array.isArray(router.query.type)
					? router.query.type
					: [router.query.type],
			);
		}
	}, [router]);

	useEffect(() => {
		if (activeProductTypeFilters.length === 0) {
			setFilteredProducts(products);
		} else {
			setFilteredProducts(
				products.filter(product =>
					activeProductTypeFilters.includes(product.type),
				),
			);
		}
	}, [router, activeProductTypeFilters]);

	useEffect(() => {
		// Filter products based on price range and current active product type filters

		if (activeProductTypeFilters.length > 0) {
			const filtered = products.filter(
				product =>
					activeProductTypeFilters.includes(product.type) &&
					product.price >= priceValues.price_min &&
					product.price <= priceValues.price_max,
			);
			setFilteredProducts(filtered);
		} else {
			const filtered = products.filter(
				product =>
					product.price >= priceValues.price_min &&
					product.price <= priceValues.price_max,
			);
			setFilteredProducts(filtered);
		}
	}, [activeProductTypeFilters, priceValues]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ query?: string }>({
		resolver: yupResolver(SearchSchema),
	});

	const submitForm: SubmitHandler<{ query?: string }> = data => {
		if (data.query) {
			let filtered = [];

			if (filteredProducts.length > 0) {
				filtered = filteredProducts.filter(product =>
					product.name
						.toLowerCase()
						.includes(data.query!.toLowerCase()),
				);
			} else {
				filtered = products.filter(product =>
					product.name
						.toLowerCase()
						.includes(data.query!.toLowerCase()),
				);
			}

			setFilteredProducts(filtered);
		} else {
			setFilteredProducts(products);
		}
	};

	return (
		<div className={inter.className}>
			<Layout title='Search packages'>
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as='div'
						className='relative z-40 lg:hidden'
						onClose={setMobileFiltersOpen}
					>
						<Transition.Child
							as={Fragment}
							enter='transition-opacity ease-linear duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='transition-opacity ease-linear duration-300'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<div className='fixed inset-0 bg-black bg-opacity-25' />
						</Transition.Child>

						<div className='fixed inset-0 z-40 flex'>
							<Transition.Child
								as={Fragment}
								enter='transition ease-in-out duration-300 transform'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transition ease-in-out duration-300 transform'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<Dialog.Panel
									className={classNames(
										'relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl',
										inter.className,
									)}
								>
									<div className='flex items-center justify-between px-4'>
										<h2 className='text-lg font-medium text-gray-900'>
											Filters
										</h2>
										<button
											type='button'
											className='relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500'
											onClick={() =>
												setMobileFiltersOpen(false)
											}
										>
											<span className='absolute -inset-0.5' />
											<span className='sr-only'>
												Close menu
											</span>
											<XMarkIcon
												className='h-6 w-6'
												aria-hidden='true'
											/>
										</button>
									</div>

									{/* Filters */}
									<form className='mt-4'>
										{filters.map(section => (
											<Disclosure
												as='div'
												key={section.name}
												className='border-t border-gray-200 pb-4 pt-4'
											>
												{({ open }) => (
													<fieldset>
														<legend className='w-full px-2'>
															<Disclosure.Button className='flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500'>
																<span className='text-sm font-medium text-gray-900'>
																	{
																		section.name
																	}
																</span>
																<span className='ml-6 flex h-7 items-center'>
																	<ChevronDownIcon
																		className={classNames(
																			open
																				? '-rotate-180'
																				: 'rotate-0',
																			'h-5 w-5 transform',
																		)}
																		aria-hidden='true'
																	/>
																</span>
															</Disclosure.Button>
														</legend>
														<Disclosure.Panel className='px-4 pb-2 pt-4'>
															<div className='space-y-6'>
																{section.options.map(
																	(
																		option,
																		optionIdx,
																	) => (
																		<div
																			key={
																				option.value
																			}
																			className='flex items-center'
																		>
																			<input
																				id={`${section.id}-${optionIdx}-mobile`}
																				name={`${section.id}[]`}
																				value={
																					option.value
																				}
																				type='checkbox'
																				className='h-4 w-4 rounded border-gray-300 text-ct-deepPink focus:ring-ct-deepPink'
																				checked={activeProductTypeFilters.includes(
																					option.value,
																				)}
																				onChange={() =>
																					handleProductTypeFilterChange(
																						option.value,
																					)
																				}
																			/>
																			<label
																				htmlFor={`${section.id}-${optionIdx}-mobile`}
																				className='ml-3 text-sm text-gray-500'
																			>
																				{
																					option.label
																				}
																			</label>
																		</div>
																	),
																)}
															</div>
														</Disclosure.Panel>
													</fieldset>
												)}
											</Disclosure>
										))}
									</form>
									<div className='px-4'>
										<PriceRange
											defaultMin={100}
											defaultMax={5000}
											barMax={5000}
											barMin={100}
											minInterval={300}
											rangeValues={priceValues}
											setRangeValues={setPriceValues}
										/>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				<main className='mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8'>
					<div className='border-b border-gray-200 pb-10 pt-24'>
						<h1 className='text-4xl font-bold tracking-tight text-gray-900'>
							Browse packages
						</h1>
						<p className='mt-4 text-base text-gray-500'>
							Browse through our exclusive package deals or
							customize your own package to suit your needs.
						</p>
					</div>

					<div className='pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4'>
						<aside>
							<h2 className='sr-only'>Filters</h2>

							<button
								type='button'
								className='inline-flex items-center lg:hidden'
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className='text-sm font-medium text-gray-700'>
									Filters
								</span>
								<PlusIcon
									className='ml-1 h-5 w-5 flex-shrink-0 text-gray-400'
									aria-hidden='true'
								/>
							</button>

							<div className='hidden lg:block'>
								<form className='space-y-10 divide-y divide-gray-200'>
									{filters.map((section, sectionIdx) => (
										<div
											key={section.name}
											className={classNames(
												sectionIdx === 0
													? null
													: 'pt-10',
											)}
										>
											<fieldset>
												<legend className='block text-sm font-medium text-gray-900'>
													{section.name}
												</legend>
												<div className='space-y-3 pt-6'>
													{section.options.map(
														(option, optionIdx) => (
															<div
																key={
																	option.value
																}
																className='flex items-center'
															>
																<input
																	id={`${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	value={
																		option.value
																	}
																	type='checkbox'
																	className='h-4 w-4 rounded border-gray-300 text-ct-deepPink focus:ring-ct-deepPink'
																	checked={activeProductTypeFilters.includes(
																		option.value,
																	)}
																	onChange={() =>
																		handleProductTypeFilterChange(
																			option.value,
																		)
																	}
																/>
																<label
																	htmlFor={`${section.id}-${optionIdx}`}
																	className='ml-3 text-sm text-gray-600'
																>
																	{
																		option.label
																	}
																</label>
															</div>
														),
													)}
												</div>
											</fieldset>
										</div>
									))}
								</form>
								<div>
									<span className='mt-10 block text-sm font-medium text-gray-900'>
										Price range
									</span>
									<PriceRange
										defaultMin={100}
										defaultMax={5000}
										barMax={5000}
										barMin={100}
										minInterval={300}
										rangeValues={priceValues}
										setRangeValues={setPriceValues}
									/>
								</div>
							</div>
						</aside>

						<section
							aria-labelledby='product-heading'
							className='mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3'
						>
							<h2 id='product-heading' className='sr-only'>
								Products
							</h2>

							<div className='mb-8'>
								<form
									className='flex items-center'
									onSubmit={handleSubmit(submitForm)}
								>
									<Input
										type='search'
										placeholder='What are you looking for?'
										id='query'
										register={register}
										errors={errors}
										hideError={true}
										extraClasses='mt-0 pt-0'
									/>

									<Button extraClasses='h-full mt-0 mb-1 md:ml-4'>
										Search
									</Button>
								</form>
							</div>

							<div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
								{!router.query ? (
									<></>
								) : (
									filteredProducts.map(product => (
										<ProductCard
											product={product}
											key={product.id}
										/>
									))
								)}
							</div>
						</section>
					</div>
				</main>
			</Layout>
		</div>
	);
};

export default Search;
