import Layout from '@/components/layout/layout';
import { inter } from '@/utils/fonts';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInProps } from '@/types/auth/auth.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInSchema } from '@/schema/sign-in-schema';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Spinner from '@/components/loaders/spinner';
import useAuth from '@/hooks/auth/useAuth';
import Cookies from 'js-cookie';
import toCamelCase from '@/utils/camel-case';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/auth/auth-context';

const SignIn = () => {
	const { login } = useAuth();
	const router = useRouter();
	const { setCurrentUser } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInProps>({
		resolver: yupResolver(SignInSchema),
	});

	const submitForm: SubmitHandler<SignInProps> = async data => {
		login.mutate(data);
	};

	if (login.error) {
		console.error(login.error);
	}

	useEffect(() => {
		if (login.data) {
			const { token, userInfo } = login.data.data.data;
			Cookies.set('token', token);
			Cookies.set('userInfo', JSON.stringify(toCamelCase(userInfo)));
			setCurrentUser({ token, userInfo: toCamelCase(userInfo) });
			router.push('/search').then();
		}

		// eslint-disable-next-line
	}, [login.data]);

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
							<form
								className='space-y-1'
								onSubmit={handleSubmit(submitForm)}
								noValidate
							>
								<Input
									type='email'
									label='Email address'
									placeholder='johndoe@example.com'
									id='email'
									register={register}
									errors={errors}
								/>

								<Input
									type='password'
									label='Password'
									placeholder=''
									id='password'
									register={register}
									errors={errors}
								/>

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

								<Button extraClasses='w-full max-w-sm flex justify-center'>
									{login.status === 'pending' && <Spinner />}
									Sign in
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SignIn;
