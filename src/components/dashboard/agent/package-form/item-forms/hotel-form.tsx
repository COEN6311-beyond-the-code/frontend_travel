import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Spinner from '@/components/loaders/spinner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HotelFormType } from '@/types/product/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { HotelSchema } from '@/schema/item-schema';
import { FC, useEffect, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import Message from '@/components/message/message';
import useProduct from '@/hooks/product/useProduct';
import { useRouter } from 'next/router';

interface IProps {
	mode: 'create' | 'edit';
}

const HotelForm: FC<IProps> = ({ mode }) => {
	const [showError, setShowError] = useState(false);
	const { createHotel } = useProduct();
	const router = useRouter();

	const {
		register: hotelRegister,
		handleSubmit: handleHotelSubmit,
		setError: hotelSetErrors,
		formState: { errors: hotelErrors },
	} = useForm<HotelFormType>({
		resolver: yupResolver(HotelSchema),
	});

	const submitHotelForm: SubmitHandler<HotelFormType> = data => {
		if (!selectedHotelFile) {
			hotelSetErrors('imageSrc', {
				type: 'manual',
				message: 'Image is required',
			});
			return;
		}

		createHotel.mutate(data);
	};

	const [selectedHotelFile, setSelectedHotelFile] = useState<any>(null);

	useEffect(() => {
		if (createHotel.data) {
			router.push('/dashboard/agent/manage-packages').then();
		} else if (createHotel.error) {
			setShowError(true);
		}

		// eslint-disable-next-line
	}, [createHotel.data, createHotel.error]);

	return (
		<div>
			<form onSubmit={handleHotelSubmit(submitHotelForm)} noValidate>
				<div className='w-8/12 space-y-1 grid grid-cols-1 gap-6 lg:grid-cols-2 items-start'>
					<Input
						type='text'
						label='Item name'
						placeholder='Hotel 1'
						id='name'
						register={hotelRegister}
						errors={hotelErrors}
					/>

					<Input
						type='text-area'
						label='Description'
						placeholder='Clear description of the package'
						id='description'
						register={hotelRegister}
						errors={hotelErrors}
						rows={3}
					/>

					<Input
						type='number'
						label='Price'
						placeholder='0.00'
						id='price'
						register={hotelRegister}
						errors={hotelErrors}
					/>

					<div className='self-center'>
						<div className='flex flex-row items-center'>
							<input
								type='file'
								id='imageSrc'
								{...hotelRegister?.('imageSrc', {
									onChange: e => {
										setSelectedHotelFile(e.target.files[0]);
									},
								})}
								hidden
								accept='image/*'
							/>
							<label
								htmlFor='imageSrc'
								className='block mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-black
						text-white hover:opacity-80 cursor-pointer'
							>
								Choose file
							</label>
							<label className='text-sm text-slate-500'>
								{selectedHotelFile
									? selectedHotelFile.name
									: 'No file chosen'}
							</label>
						</div>
						{hotelErrors.imageSrc && (
							<p className='text-red-500'>
								{hotelErrors.imageSrc.message as string}
							</p>
						)}
					</div>

					<Input
						type='text'
						label='Hotel Name'
						placeholder='Hotel Name'
						id='hotelName'
						register={hotelRegister}
						errors={hotelErrors}
					/>

					<Input
						type='select'
						label='Room'
						placeholder='Room'
						id='room'
						selectOptions={[
							'Single',
							'Double',
							'Suite',
							'Penthouse',
						]}
						register={hotelRegister}
						errors={hotelErrors}
					/>

					<Input
						type='text'
						label='Address'
						placeholder='Address'
						id='address'
						register={hotelRegister}
						errors={hotelErrors}
					/>

					<Input
						type='date'
						label='Start Date'
						placeholder='Start Date'
						id='startDate'
						register={hotelRegister}
						errors={hotelErrors}
					/>

					<Input
						type='date'
						label='End Date'
						placeholder='End Date'
						id='endDate'
						register={hotelRegister}
						errors={hotelErrors}
					/>

					<Input
						type='time'
						label='Check-in Time'
						placeholder='Check-in Time'
						id='checkInTime'
						register={hotelRegister}
						errors={hotelErrors}
					/>

					<Input
						type='time'
						label='Check-out Time'
						placeholder='Check-out Time'
						id='checkOutTime'
						register={hotelRegister}
						errors={hotelErrors}
					/>
				</div>

				<Button extraClasses='px-12 mt-4 max-w-sm flex justify-center'>
					{createHotel.isPending && <Spinner />}
					{mode === 'create' ? 'Create Hotel' : 'Edit Hotel'}
				</Button>
			</form>

			<Message
				title='Hotel creation error'
				subtitle={`${createHotel?.error?.message}`}
				Icon={ExclamationCircleIcon}
				iconColor='text-red-500'
				show={showError}
				setShow={setShowError}
			/>
		</div>
	);
};

export default HotelForm;
