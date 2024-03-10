import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Message from '@/components/message/message';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { ProfileSchema } from '@/schema/profile-schema';
import { ProfileType, UserType } from '@/types/auth/auth.types';
import useAuth from '@/hooks/auth/useAuth';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import Spinner from '@/components/loaders/spinner';

interface IProps {
	user?: UserType;
}

const Profile: FC<IProps> = ({ user }) => {
	const [show, setShow] = useState(false);
	const [showError, setShowError] = useState(false);
	const { updateProfile } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileType>({
		resolver: yupResolver(ProfileSchema),
	});

	const submitForm: SubmitHandler<ProfileType> = async data => {
		updateProfile.mutate(data);
	};

	useEffect(() => {
		if (updateProfile.data) {
			setShow(true);
		}
	}, [updateProfile.data]);

	useEffect(() => {
		if (updateProfile.error) {
			setShowError(true);
		}
	}, [updateProfile.error]);

	return (
		<div>
			<h4 className='header-four'>Profile</h4>

			<form
				noValidate
				className='mt-5 w-full md:w-8/12'
				onSubmit={handleSubmit(submitForm)}
			>
				<div className='grid md:grid-cols-2 md:gap-x-0 gap-x-0 gap-y-5'>
					<Input
						label='First Name'
						id='firstName'
						type='text'
						defaultValue={user?.userInfo.firstName}
						placeholder='John'
						register={register}
						errors={errors}
					/>

					<Input
						label='Last Name'
						id='lastName'
						type='text'
						defaultValue={user?.userInfo.lastName}
						placeholder='Doe'
						register={register}
						errors={errors}
					/>

					<Input
						label='Mobile'
						id='mobile'
						type='text'
						defaultValue={user?.userInfo.mobile}
						placeholder='0245556677'
						register={register}
						errors={errors}
					/>
				</div>

				<div className='mt-5' />

				<Button extraClasses='px-10 max-w-sm flex justify-center mt-2 !bg-black'>
					{updateProfile.isPending && <Spinner />}
					Update Profile
				</Button>
			</form>
			<Message
				title='Profile updated!'
				subtitle='Your profile has been updated'
				show={show}
				setShow={setShow}
			/>
			<Message
				title='Profile update failed!'
				subtitle={`${updateProfile?.error?.message}`}
				Icon={ExclamationCircleIcon}
				iconColor='text-red-500'
				show={showError}
				setShow={setShowError}
			/>
		</div>
	);
};

export default Profile;
