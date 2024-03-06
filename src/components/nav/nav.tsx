import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	ArchiveBoxIcon,
	XMarkIcon as XMarkIconOutline,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { inter } from '@/utils/fonts';
import Link from 'next/link';
import PackageCart from '@/components/package-cart/package-cart';
import { AuthContext } from '@/context/auth/auth-context';
import Cookies from 'js-cookie';
import { classNames } from '@/utils/classNames';
import useAuth from '@/hooks/auth/useAuth';
import { useRouter } from 'next/router';

const navigation = {
	pages: [
		{ name: 'Packages', href: '/search?type=package' },
		{ name: 'Flights', href: '/search?type=flight' },
		{ name: 'Hotels', href: '/search?type=hotel' },
		{ name: 'Activities', href: '/search?type=activity' },
	],
};

export default function NavBar() {
	const [open, setOpen] = useState(false);
	const [openCart, setOpenCart] = useState(false);

	const { currentUser, setCurrentUser } = useContext(AuthContext);
	const isTokenSet = Cookies.get('token');

	const { logout } = useAuth();
	const router = useRouter();

	const handleLogout = () => {
		logout.mutate({});
	};

	useEffect(() => {
		if (logout.data) {
			Cookies.remove('token');
			Cookies.remove('userInfo');
			setCurrentUser(null);
			router.push('/').then();
		}

		// eslint-disable-next-line
	}, [logout.data]);

	return (
		<div className={clsx('bg-white relative z-10', inter.className)}>
			{/* Mobile menu */}
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as='div'
					className={classNames(
						inter.className,
						'relative z-40 lg:hidden',
					)}
					onClose={setOpen}
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
							enterFrom='-translate-x-full'
							enterTo='translate-x-0'
							leave='transition ease-in-out duration-300 transform'
							leaveFrom='translate-x-0'
							leaveTo='-translate-x-full'
						>
							<Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
								<div className='flex px-4 pb-2 pt-5'>
									<button
										type='button'
										className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
										onClick={() => setOpen(false)}
									>
										<span className='absolute -inset-0.5' />
										<span className='sr-only'>
											Close menu
										</span>
										<XMarkIconOutline
											className='h-6 w-6'
											aria-hidden='true'
										/>
									</button>
								</div>

								<div className='space-y-6 border-t border-gray-200 px-4 py-6'>
									{navigation.pages.map(page => (
										<div
											key={page.name}
											className='flow-root'
										>
											<Link
												href={page.href}
												className='-m-2 block p-2 font-medium text-gray-900'
											>
												{page.name}
											</Link>
										</div>
									))}
								</div>

								<div className='space-y-6 border-t border-gray-200 px-4 py-6'>
									{!currentUser || !isTokenSet ? (
										<>
											<div className='flow-root'>
												<Link
													href='/sign-in'
													className='-m-2 block p-2 font-medium text-gray-900 hover:text-ct-deepPink'
												>
													Sign in
												</Link>
											</div>
											<div className='flow-root'>
												<Link
													href='/sign-up'
													className='-m-2 block p-2 font-medium text-gray-900'
												>
													Create account
												</Link>
											</div>
										</>
									) : (
										<>
											<div className='flow-root'>
												<Link
													href={
														currentUser.userInfo
															.isAgent
															? '/dashboard/agent/orders'
															: '/dashboard/user/order-history'
													}
													className='-m-2 block p-2 font-medium text-gray-900'
												>
													Dashboard
												</Link>
											</div>
											<div className='flow-root'>
												<p
													className='-m-2 block p-2 font-medium text-gray-900 cursor-pointer'
													onClick={handleLogout}
												>
													Sign out
												</p>
											</div>
										</>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			<header className='relative bg-white'>
				<nav
					aria-label='Top'
					className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
				>
					<div className='border-b border-gray-200'>
						<div className='flex h-16 items-center'>
							<button
								type='button'
								className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
								onClick={() => setOpen(true)}
							>
								<span className='absolute -inset-0.5' />
								<span className='sr-only'>Open menu</span>
								<Bars3Icon
									className='h-6 w-6'
									aria-hidden='true'
								/>
							</button>

							{/* Logo */}
							<div className='ml-4 flex lg:ml-0'>
								<Link href='/'>
									<span className='sr-only'>
										Your Company
									</span>
									<img
										className='h-8 w-auto'
										src='https://tailwindui.com/img/logos/mark.svg?color=pink&shade=600'
										alt=''
									/>
								</Link>
							</div>

							{/* Flyout menus */}
							<Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
								<div className='flex h-full space-x-8'>
									{navigation.pages.map(page => (
										<a
											key={page.name}
											href={page.href}
											className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
										>
											{page.name}
										</a>
									))}
								</div>
							</Popover.Group>

							<div className='ml-auto flex items-center'>
								<div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
									{!currentUser || !isTokenSet ? (
										<>
											<Link
												href='/sign-in'
												className='text-sm font-medium text-gray-700 transition ease-in-out duration-200 hover:text-ct-deepPink'
											>
												Sign in
											</Link>
											<span
												className='h-6 w-px bg-gray-200'
												aria-hidden='true'
											/>
											<Link
												href='/sign-up'
												className='text-sm font-medium text-gray-700 transition ease-in-out duration-200 hover:text-ct-deepPink'
											>
												Create account
											</Link>
										</>
									) : (
										<>
											<Link
												href={
													currentUser.userInfo.isAgent
														? '/dashboard/agent/orders'
														: '/dashboard/user/order-history'
												}
												className='text-sm font-medium text-gray-700 transition ease-in-out duration-200 hover:text-ct-deepPink'
											>
												Dashboard
											</Link>
											<div className='flow-root'>
												<p
													className='text-sm font-medium text-gray-700 transition ease-in-out duration-200 hover:text-ct-deepPink cursor-pointer'
													onClick={handleLogout}
												>
													Sign out
												</p>
											</div>
										</>
									)}
								</div>

								{/* Search */}
								<div className='flex lg:ml-6'>
									<Link
										href='/search'
										className='p-2 text-gray-400 hover:text-gray-500'
									>
										<span className='sr-only'>Search</span>
										<MagnifyingGlassIcon
											className='h-6 w-6'
											aria-hidden='true'
										/>
									</Link>
								</div>

								{/* Cart */}
								<div
									className='ml-4 lg:ml-6 flex items-center justify-center cursor-pointer'
									onClick={() => {
										setOpenCart(!openCart);
									}}
								>
									<ArchiveBoxIcon
										className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
										aria-hidden='true'
									/>
									<span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
										0
									</span>
									<span className='sr-only'>
										items in cart, view bag
									</span>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>

			<PackageCart open={openCart} setOpen={setOpenCart} />
		</div>
	);
}
