import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ItemSchema } from '@/schema/item-schema';
import { ItemFormType } from '@/types/product/product';
import Input from '@/components/input/input';
import { FC, useState } from 'react';
import Spinner from '@/components/loaders/spinner';
import Button from '@/components/button/button';

interface IProps {
	mode: 'create' | 'edit';
}

const ItemForm: FC<IProps> = ({ mode }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ItemFormType>({
		resolver: yupResolver(ItemSchema),
	});

	const submitForm: SubmitHandler<ItemFormType> = data => {
		console.log(data);
	};

	const [selectedFile, setSelectedFile] = useState('No file chosen');
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div>
			<form onSubmit={handleSubmit(submitForm)} noValidate>
				<div className='w-8/12 space-y-1 grid grid-cols-1 gap-6 lg:grid-cols-2'>
					<Input
						type='text'
						label='Package name'
						placeholder='Package 1'
						id='name'
						register={register}
						errors={errors}
					/>

					<Input
						type='text-area'
						label='Description'
						placeholder='Clear description of the package'
						id='description'
						register={register}
						errors={errors}
					/>

					<Input
						type='number'
						label='Price'
						placeholder='0.00'
						id='price'
						register={register}
						errors={errors}
					/>

					{/*TODO: Image upload*/}
					<div className='flex flex-row items-center'>
						<input
							type='file'
							id='custom-input'
							onChange={e =>
								setSelectedFile(e.target.files![0].name)
							}
							hidden
						/>
						<label
							htmlFor='custom-input'
							className='block mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-black
						text-white hover:opacity-80 cursor-pointer'
						>
							Choose file
						</label>
						<label className='text-sm text-slate-500'>
							{selectedFile}
						</label>
					</div>

					<Input
						type='text'
						label='Image Alt'
						placeholder='Image alt text'
						id='alt'
						register={register}
						errors={errors}
					/>

					<Input
						type='select'
						label='Item Type'
						placeholder='Item Type'
						id='userType'
						selectOptions={['Flight', 'Hotel', 'Activity']}
						register={register}
						errors={errors}
					/>
				</div>

				{mode === 'create' ? (
					<Button extraClasses='px-12 max-w-sm flex justify-center'>
						{isLoading && <Spinner />}
						Create Item
					</Button>
				) : (
					<Button extraClasses='px-12 max-w-sm flex justify-center'>
						{isLoading && <Spinner />}
						Edit Item
					</Button>
				)}
			</form>
		</div>
	);
};

export default ItemForm;
