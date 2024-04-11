import Layout from '@/components/layout/layout';
import { inter } from '@/utils/fonts';
import Link from 'next/link';
import Input from '@/components/input/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpProps } from '@/types/auth/auth.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpSchema } from '@/schema/sign-up-schema';
import Button from '@/components/button/button';
import Spinner from '@/components/loaders/spinner';
import { useContext, useEffect, useState } from 'react';
import Message from '@/components/message/message';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import useAuth from '@/hooks/auth/useAuth';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import toCamelCase from '@/utils/camel-case';
import { AuthContext } from '@/context/auth/auth-context';
// import Message from '@/components/message/message';
// import {ExclamationCircleIcon} from "@heroicons/react/16/solid";

const SignUp = () => {
	const [show, setShow] = useState(false);
	const [showError, setShowError] = useState(false);
	const { register: signUp } = useAuth();
	const router = useRouter();
	const { setCurrentUser } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpProps>({
		resolver: yupResolver(SignUpSchema),
	});

	const submitForm: SubmitHandler<SignUpProps> = data => {
		signUp.mutate(data);
	};

	useEffect(() => {
		if (signUp.isPending) {
			setShow(true);
		}

		if (signUp.isError) {
			setShowError(true);
		}

		if (signUp.data) {
			const { token, userInfo } = signUp.data.data.data;
			Cookies.set('token', token);
			Cookies.set('userInfo', JSON.stringify(toCamelCase(userInfo)));
			setCurrentUser({ token, userInfo: toCamelCase(userInfo) });
			router.push('/search').then();
		}

		// eslint-disable-next-line
	}, [signUp.isPending, signUp.isError, signUp.isSuccess]);

	return (
		<Layout title='Sign Up'>
			<div className={inter.className}>
				<div className='flex min-h-[calc(100vh_-_184px)] flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-md'>
						<img
							className='mx-auto h-10 w-auto'
							src='https://tailwindui.com/img/logos/mark.svg?color=pink&shade=600'
							alt='Your Company'
						/>
						<h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
							Sign up to your account
						</h2>
						<p>
							Sign up to your account and access our exclusive
							deals
						</p>
					</div>

					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
						<div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
							<form
								className='space-y-1'
								onSubmit={handleSubmit(submitForm)}
							>
								<Input
									type='text'
									label='First Name'
									placeholder='John'
									id='firstName'
									register={register}
									errors={errors}
								/>

								<Input
									type='text'
									label='Last Name'
									placeholder='Doe'
									id='lastName'
									register={register}
									errors={errors}
								/>

								<Input
									type='email'
									label='Email'
									placeholder='johndoe@example.com'
									id='email'
									register={register}
									errors={errors}
								/>

								<Input
									type='text'
									label='Mobile'
									placeholder='4387772635'
									id='mobile'
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

								<Input
									type='password'
									label='Confirm Password'
									placeholder=''
									id='confirmPassword'
									register={register}
									errors={errors}
								/>

								<div className='flex items-center justify-between'>
									<div className='text-sm leading-6'>
										Already have an account?{' '}
										<Link
											href='/sign-in'
											className='font-semibold text-ct-deepPink hover:opacity-80'
										>
											Sign in
										</Link>
									</div>
								</div>

								<div>
									<Button
										extraClasses='w-full max-w-sm flex justify-center mt-2'
										disabled={signUp.isPending}
									>
										{signUp.isPending && <Spinner />}
										{signUp.isPending
											? 'Awaiting verification...'
											: 'Sign up'}
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Message
				title='Verify your email address'
				subtitle='Please check your email to verify your account to continue'
				show={show}
				setShow={setShow}
			/>
			<Message
				title='Sign up error'
				subtitle='An error occurred while signing you up. Please try again.'
				Icon={ExclamationCircleIcon}
				iconColor='text-red-500'
				show={showError}
				setShow={setShowError}
			/>
		</Layout>
	);
};

export default SignUp;
