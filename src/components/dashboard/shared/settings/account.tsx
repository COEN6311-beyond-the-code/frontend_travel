import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Message from '@/components/message/message';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInProps, UserType } from '@/types/auth/auth.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountSchema } from '@/schema/profile-schema';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import useAuth from '@/hooks/auth/useAuth';
import Spinner from '@/components/loaders/spinner';

const Account = ({ user }: { user: UserType }) => {
	const [show, setShow] = useState(false);
	const [showError, setShowError] = useState(false);

	const { updateAccount } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInProps>({
		resolver: yupResolver(AccountSchema),
	});

	const submitForm: SubmitHandler<SignInProps> = async data => {
		updateAccount.mutate(data);
	};

	useEffect(() => {
		if (updateAccount.data) {
			setShow(true);
		} else if (updateAccount.error) {
			setShowError(true);
		}
	}, [updateAccount.data, updateAccount.error]);

	return (
		<div className='mt-16'>
			<h4 className='header-four'>Account</h4>

			<form
				noValidate
				className='mt-5 w-full md:w-8/12'
				onSubmit={handleSubmit(submitForm)}
			>
				<div className='grid md:grid-cols-2 md:gap-x-0 gap-x-0 gap-y-5'>
					<Input
						type='email'
						label='Email address'
						placeholder='johndoe@example.com'
						defaultValue={user.userInfo.email}
						disabled={true}
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
				</div>

				<div className='mt-5' />

				<Button extraClasses='px-10 max-w-sm flex justify-center mt-2 !bg-black'>
					{updateAccount.isPending && <Spinner />}
					Update Account
				</Button>

				{updateAccount.isPending && (
					<p className='mt-3 text-lg font-bold text-gray-500'>
						Check your email and click the verification link to to
						verify this action
					</p>
				)}
			</form>
			<Message
				title='User credentials updated'
				subtitle='Your user credentials have been updated'
				show={show}
				setShow={setShow}
			/>
			<Message
				title='Profile update failed!'
				subtitle={`${updateAccount?.error?.message}`}
				Icon={ExclamationCircleIcon}
				iconColor='text-red-500'
				show={showError}
				setShow={setShowError}
			/>
		</div>
	);
};

export default Account;
