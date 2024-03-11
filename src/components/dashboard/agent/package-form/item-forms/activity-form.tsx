import { SubmitHandler, useForm } from 'react-hook-form';
import { ActivityFormType } from '@/types/product/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { ActivitySchema } from '@/schema/item-schema';
import { FC, useState } from 'react';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Spinner from '@/components/loaders/spinner';

interface IProps {
	mode: 'create' | 'edit';
}

const ActivityForm: FC<IProps> = ({ mode }) => {
	const {
		register: activityRegister,
		handleSubmit: handleActivitySubmit,
		setError: activitySetErrors,
		formState: { errors: activityErrors },
	} = useForm<ActivityFormType>({
		resolver: yupResolver(ActivitySchema),
	});

	const submitActivityForm: SubmitHandler<ActivityFormType> = data => {
		if (!selectedActivityFile) {
			activitySetErrors('imageSrc', {
				type: 'manual',
				message: 'Image is required',
			});
			return;
		}
		console.log(data);
		console.log(activityErrors);
	};

	const [selectedActivityFile, setSelectedActivityFile] = useState<any>(null);

	return (
		<div>
			<form
				onSubmit={handleActivitySubmit(submitActivityForm)}
				noValidate
			>
				<div className='w-8/12 space-y-1 grid grid-cols-1 gap-6 lg:grid-cols-2 items-start'>
					<Input
						type='text'
						label='Package name'
						placeholder='Package 1'
						id='name'
						register={activityRegister}
						errors={activityErrors}
					/>

					<Input
						type='text-area'
						label='Description'
						placeholder='Clear description of the package'
						id='description'
						register={activityRegister}
						errors={activityErrors}
						rows={3}
					/>

					<Input
						type='number'
						label='Price'
						placeholder='0.00'
						id='price'
						register={activityRegister}
						errors={activityErrors}
					/>

					<div className='self-center'>
						<div className='flex flex-row items-center'>
							<input
								type='file'
								id='imageSrc'
								{...activityRegister?.('imageSrc', {
									onChange: e => {
										setSelectedActivityFile(
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
								{selectedActivityFile
									? selectedActivityFile.name
									: 'No file chosen'}
							</label>
						</div>
						{activityErrors.imageSrc && (
							<p className='text-red-500'>
								{activityErrors.imageSrc.message as string}
							</p>
						)}
					</div>

					<Input
						type='text'
						label='Image Alt'
						placeholder='Image alt text'
						id='imageAlt'
						register={activityRegister}
						errors={activityErrors}
					/>

					<Input
						type='text'
						label='Event'
						placeholder='Event'
						id='event'
						register={activityRegister}
						errors={activityErrors}
					/>

					<Input
						type='text'
						label='Location'
						placeholder='Location'
						id='location'
						register={activityRegister}
						errors={activityErrors}
					/>

					<Input
						type='text'
						label='Address'
						placeholder='Address'
						id='address'
						register={activityRegister}
						errors={activityErrors}
					/>

					<Input
						type='date'
						label='Start Date'
						placeholder='Start Date'
						id='startDate'
						register={activityRegister}
						errors={activityErrors}
					/>

					<Input
						type='date'
						label='End Date'
						placeholder='End Date'
						id='endDate'
						register={activityRegister}
						errors={activityErrors}
					/>

					<Input
						type='time'
						label='Time'
						placeholder='Time'
						id='time'
						register={activityRegister}
						errors={activityErrors}
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

export default ActivityForm;
