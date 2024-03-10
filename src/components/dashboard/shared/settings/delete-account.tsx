import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils/classNames';
import { inter } from '@/utils/fonts';
import { useRouter } from 'next/router';
import { SignInProps, UserType } from '@/types/auth/auth.types';
import useAuth from '@/hooks/auth/useAuth';
import Cookies from 'js-cookie';
import { AuthContext } from '@/context/auth/auth-context';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import Message from '@/components/message/message';
import Input from '@/components/input/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DeactivateAccountSchema } from '@/schema/profile-schema';
import Spinner from '@/components/loaders/spinner';

const DeleteAccount = ({ user }: { user: UserType }) => {
	const [open, setOpen] = useState(false);
	const [showError, setShowError] = useState(false);
	const router = useRouter();
	const { deactivateAccount } = useAuth();
	const { setCurrentUser } = useContext(AuthContext);

	const cancelButtonRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ password: string }>({
		resolver: yupResolver(DeactivateAccountSchema),
	});

	const submitForm: SubmitHandler<{ password: string }> = async data => {
		deactivateAccount.mutate({
			password: data.password,
			email: user.userInfo.email,
		});
	};

	useEffect(() => {
		if (deactivateAccount.data) {
			Cookies.remove('token');
			Cookies.remove('userInfo');
			setCurrentUser(null);
			router.push('/').then();
		} else if (deactivateAccount.error) {
			setShowError(true);
		}
		// eslint-disable-next-line
	}, [deactivateAccount.data, deactivateAccount.error]);

	return (
		<div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3'>
			<div>
				<h2 className='text-base font-semibold leading-7 text-black header-four'>
					Delete account
				</h2>
				<p className='mt-1 text-sm leading-6 text-black'>
					No longer want to use our service? You can delete your
					account here. This action is not reversible. All information
					related to this account will be deleted permanently.
				</p>
			</div>

			<div className='flex items-start md:col-span-2'>
				<button
					className='rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400'
					onClick={() => setOpen(true)}
				>
					Yes, delete my account
				</button>
			</div>

			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as='div'
					className={classNames(inter.className, 'relative z-50')}
					initialFocus={cancelButtonRef}
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
						<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
								enterTo='opacity-100 translate-y-0 sm:scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 translate-y-0 sm:scale-100'
								leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							>
								<Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
									<form onSubmit={handleSubmit(submitForm)}>
										<div className='sm:flex sm:items-start'>
											<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
												<ExclamationTriangleIcon
													className='h-6 w-6 text-red-600'
													aria-hidden='true'
												/>
											</div>
											<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
												<Dialog.Title
													as='h3'
													className='text-base font-semibold leading-6 text-gray-900'
												>
													Deactivate account
												</Dialog.Title>
												<div className='mt-2 mb-5'>
													<p className='text-sm text-gray-500'>
														Are you sure you want to
														deactivate your account?
														All of your data will be
														permanently removed from
														our servers forever.
														This action cannot be
														undone.
													</p>
												</div>

												<Input
													type='password'
													label='Please enter your password'
													placeholder=''
													id='password'
													register={register}
													errors={errors}
												/>
											</div>
										</div>
										<div className='mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4'>
											<button
												type='submit'
												className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto'
											>
												{deactivateAccount.isPending && (
													<Spinner />
												)}
												Deactivate
											</button>
											<button
												type='button'
												className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto'
												onClick={() => setOpen(false)}
												ref={cancelButtonRef}
											>
												Cancel
											</button>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>

			<Message
				title='Sign in error'
				subtitle={
					deactivateAccount.error?.message || 'An error occurred'
				}
				Icon={ExclamationCircleIcon}
				iconColor='text-red-500'
				show={showError}
				setShow={setShowError}
			/>
		</div>
	);
};

export default DeleteAccount;
