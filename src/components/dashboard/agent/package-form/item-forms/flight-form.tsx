import { SubmitHandler, useForm } from 'react-hook-form';
import { FlightFormType } from '@/types/product/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { FlightSchema } from '@/schema/item-schema';
import { FC, useState } from 'react';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Spinner from '@/components/loaders/spinner';

interface IProps {
	mode: 'create' | 'edit';
}

const FlightForm: FC<IProps> = ({ mode }) => {
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
		console.log(data);
		console.log(flightErrors);
	};

	const [selectedFlightFile, setSelectedFlightFile] = useState<any>(null);

	return (
		<div>
			<form onSubmit={handleFlightSubmit(submitFlightForm)} noValidate>
				<div className='w-8/12 space-y-1 grid grid-cols-1 gap-6 lg:grid-cols-2 items-start'>
					<Input
						type='text'
						label='Flight name'
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
						label='Image Alt'
						placeholder='Image alt text'
						id='imageAlt'
						register={flightRegister}
						errors={flightErrors}
					/>

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
						type='date'
						label='Start Date'
						placeholder='Start Date'
						id='startDate'
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
					{/*{isLoading && <Spinner/>}*/}
					{mode === 'create' ? 'Create Item' : 'Edit Item'}
				</Button>
			</form>
		</div>
	);
};

export default FlightForm;
