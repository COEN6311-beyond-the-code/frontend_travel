import { SubmitHandler, useForm } from 'react-hook-form';
import { FlightFormType } from '@/types/product/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { FlightSchema } from '@/schema/item-schema';
import { FC, useEffect, useState } from 'react';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Spinner from '@/components/loaders/spinner';
import useProduct from '@/hooks/product/useProduct';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import Message from '@/components/message/message';
import { useRouter } from 'next/router';

interface IProps {
	mode: 'create' | 'edit';
}

const FlightForm: FC<IProps> = ({ mode }) => {
	const { createFlight } = useProduct();
	const [showError, setShowError] = useState(false);
	const router = useRouter();

	const {
		register: flightRegister,
		handleSubmit: handleFlightSubmit,
		setError: flightSetErrors,
		formState: { errors: flightErrors },
	} = useForm<FlightFormType>({
		resolver: yupResolver(FlightSchema),
	});

	const submitFlightForm: SubmitHandler<FlightFormType> = data => {
		if (!selectedFlightFile) {
			flightSetErrors('imageSrc', {
				type: 'manual',
				message: 'Image is required',
			});
			return;
		}

		createFlight.mutate(data);
	};

	const [selectedFlightFile, setSelectedFlightFile] = useState<any>(null);

	useEffect(() => {
		if (createFlight.data) {
			router.push('/dashboard/agent/manage-packages').then();
		} else if (createFlight.error) {
			setShowError(true);
		}

		// eslint-disable-next-line
	}, [createFlight.data, createFlight.error]);

	return (
		<div>
			<form onSubmit={handleFlightSubmit(submitFlightForm)} noValidate>
				<div className='w-8/12 space-y-1 grid grid-cols-1 gap-6 lg:grid-cols-2 items-start'>
					<Input
						type='text'
						label='Item name'
						placeholder='Flight 1'
						id='name'
						register={flightRegister}
						errors={flightErrors}
					/>

					<Input
						type='text-area'
						label='Description'
						placeholder='Clear description of the package'
						id='description'
						register={flightRegister}
						errors={flightErrors}
						rows={3}
					/>

					<Input
						type='number'
						label='Price'
						placeholder='0.00'
						id='price'
						register={flightRegister}
						errors={flightErrors}
					/>

					<div className='self-center'>
						<div className='flex flex-row items-center'>
							<input
								type='file'
								id='imageSrc'
								{...flightRegister?.('imageSrc', {
									onChange: e => {
										setSelectedFlightFile(
											e.target.files[0],
										);
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
								{selectedFlightFile
									? selectedFlightFile.name
									: 'No file chosen'}
							</label>
						</div>
						{flightErrors.imageSrc && (
							<p className='text-red-500'>
								{flightErrors.imageSrc.message as string}
							</p>
						)}
					</div>

					<Input
						type='text'
						label='Flight Number'
						placeholder='Flight Number'
						id='flightNumber'
						register={flightRegister}
						errors={flightErrors}
					/>

					<Input
						type='select'
						label='Seat Class'
						placeholder='Seat Class'
						id='seatClass'
						selectOptions={['Economy', 'Business', 'First']}
						register={flightRegister}
						errors={flightErrors}
					/>

					<Input
						type='date'
						label='Start Date'
						placeholder='Start Date'
						id='startDate'
						register={flightRegister}
						errors={flightErrors}
					/>

					<Input
						type='date'
						label='End Date'
						placeholder='End Date'
						id='endDate'
						register={flightRegister}
						errors={flightErrors}
					/>

					<Input
						type='text'
						label='Destination'
						placeholder='Destination'
						id='destination'
						register={flightRegister}
						errors={flightErrors}
					/>

					<Input
						type='time'
						label='Departure Time'
						placeholder='Departure Time'
						id='departureTime'
						register={flightRegister}
						errors={flightErrors}
					/>

					<Input
						type='time'
						label='Arrival Time'
						placeholder='Arrival Time'
						id='arrivalTime'
						register={flightRegister}
						errors={flightErrors}
					/>
				</div>

				<Button extraClasses='px-12 mt-4 max-w-sm flex justify-center'>
					{createFlight.isPending && <Spinner />}
					{mode === 'create' ? 'Create Flight' : 'Edit Flight'}
				</Button>
			</form>

			<Message
				title='Flight creation error'
				subtitle={`${createFlight?.error?.message}`}
				Icon={ExclamationCircleIcon}
				iconColor='text-red-500'
				show={showError}
				setShow={setShowError}
			/>
		</div>
	);
};

export default FlightForm;