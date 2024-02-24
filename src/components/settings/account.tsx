import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Message from '@/components/message/message';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInProps } from '@/types/auth/auth.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountSchema } from '@/schema/profile-schema';

const Account = () => {
	const [load, setLoad] = useState(false);
	const [show, setShow] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInProps>({
		resolver: yupResolver(AccountSchema),
	});

	const submitForm: SubmitHandler<SignInProps> = async data => {};

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

				<Button extraClasses='w-full max-w-sm flex justify-center mt-2'>
					{/*{authLoading && <Spinner />}*/}
					Update
				</Button>
			</form>
			<Message
				title='User credentials updated'
				subtitle='Your user credentials have been updated'
				show={show}
				setShow={setShow}
			/>
		</div>
	);
};

export default Account;
