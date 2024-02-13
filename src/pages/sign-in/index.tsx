import Layout from '@/components/layout/layout';
import { inter } from '@/utils/fonts';
import Link from 'next/link';

const SignIn = () => {
	return (
		<Layout title='Sign In'>
			<div className={inter.className}>
				<div className='flex min-h-[calc(100vh_-_184px)] flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-md'>
						<img
							className='mx-auto h-10 w-auto'
							src='https://tailwindui.com/img/logos/mark.svg?color=pink&shade=600'
							alt='Your Company'
						/>
						<h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
							Sign in to your account
						</h2>
						<p>
							Log in to your account and access our exclusive
							deals
						</p>
					</div>

					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
						<div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
							<form className='space-y-6'>
								<div>
									<label
										htmlFor='email'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Email address
									</label>
									<div className='mt-2'>
										<input
											id='email'
											name='email'
											type='email'
											autoComplete='email'
											required
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                                            focus:ring-inset focus:ring-black sm:text-sm sm:leading-6'
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor='password'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Password
									</label>
									<div className='mt-2'>
										<input
											id='password'
											name='password'
											type='password'
											autoComplete='current-password'
											required
											className='block w-full rounded-md border-0 py-1.5 text-gray-900
                                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                            focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6'
										/>
									</div>
								</div>

								<div className='flex items-center justify-between'>
									<div className='text-sm leading-6'>
										Don't have an account?{' '}
										<Link
											href='/sign-up'
											className='font-semibold text-ct-deepPink hover:opacity-80'
										>
											Sign up
										</Link>
									</div>
								</div>

								<div>
									<button
										type='submit'
										className='flex w-full justify-center rounded-md bg-ct-deepPink px-3 py-1.5
                                        text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80
                                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                        focus-visible:outline-ct-deepPink'
									>
										Sign in
									</button>
								</div>
							</form>
						</div>

						{/*<p className='mt-10 text-center text-sm text-gray-500'>*/}
						{/*    Not a member?{' '}*/}
						{/*    <a*/}
						{/*        href='#'*/}
						{/*        className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'*/}
						{/*    >*/}
						{/*        Start a 14 day free trial*/}
						{/*    </a>*/}
						{/*</p>*/}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SignIn;
