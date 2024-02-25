import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Message from '@/components/message/message';
import Button from '@/components/button/button';
// import Spinner from "@/components/loaders/spinner";
import Input from '@/components/input/input';
import { ProfileSchema } from '@/schema/profile-schema';
import { ProfileType } from '@/types/auth/auth.types';

interface IProps {
	user?: any;
}

const Profile: FC<IProps> = ({ user }) => {
	const [load, setLoad] = useState(false);
	const [show, setShow] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileType>({
		resolver: yupResolver(ProfileSchema),
	});

	const submitForm: SubmitHandler<ProfileType> = async data => {
		setLoad(true);
		setLoad(false);
		setShow(true);
	};

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
						defaultValue={user.firstName}
						placeholder='John'
						register={register}
						errors={errors}
					/>

					<Input
						label='Last Name'
						id='lastName'
						type='text'
						defaultValue={user.lastName}
						placeholder='Doe'
						register={register}
						errors={errors}
					/>

					<Input
						label='Mobile'
						id='mobile'
						type='text'
						defaultValue={user.mobile}
						placeholder='0245556677'
						register={register}
						errors={errors}
					/>
				</div>

				<div className='mt-5' />

				<Button extraClasses='px-10 max-w-sm flex justify-center mt-2 !bg-black'>
					{/*{authLoading && <Spinner />}*/}
					Update
				</Button>
			</form>
			<Message
				title='Profile updated!'
				subtitle='Your profile has been updated'
				show={show}
				setShow={setShow}
			/>
		</div>
	);
};

export default Profile;
