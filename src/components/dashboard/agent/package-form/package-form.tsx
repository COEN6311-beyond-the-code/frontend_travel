import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PackageFormType, Product } from '@/types/product/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { PackageSchema } from '@/schema/item-schema';
import Spinner from '@/components/loaders/spinner';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import useProduct from '@/hooks/product/useProduct';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import Message from '@/components/message/message';
import { useRouter } from 'next/router';

interface IProps {
	mode: 'create' | 'edit';
}

const PackageForm: FC<IProps> = ({ mode }) => {
	const [selectedFile, setSelectedFile] = useState<any>(null);
	const { getAllAgentProducts, createPackage } = useProduct();
	const [products, setProducts] = useState<Product[]>([]);
	const [showError, setShowError] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (getAllAgentProducts.data) {
			setProducts(getAllAgentProducts.data.data.data);
		}
	}, [getAllAgentProducts.data]);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<PackageFormType>({
		resolver: yupResolver(PackageSchema),
	});

	const submitForm: SubmitHandler<PackageFormType> = data => {
		if (!selectedFile) {
			setError('imageSrc', {
				type: 'manual',
				message: 'Image is required',
			});
			return;
		}

		const flight = products.find(
			product => product.name.toLowerCase() === data.flight,
		);
		const hotel = products.find(
			product => product.name.toLowerCase() === data.hotel,
		);
		const activity = products.find(
			product => product.name.toLowerCase() === data.activity,
		);

		data.flight = flight
			? {
					id: flight.id,
					type: 1,
					number: 1,
				}
			: null;

		data.hotel = hotel
			? {
					id: hotel.id,
					type: 2,
					number: 1,
				}
			: null;

		data.activity = activity
			? {
					id: activity.id,
					type: 3,
					number: 1,
				}
			: null;

		createPackage.mutate(data);
	};

	useEffect(() => {
		if (createPackage.data) {
			router.push('/dashboard/agent/manage-packages').then();
		} else if (createPackage.error) {
			setShowError(true);
		}

		// eslint-disable-next-line
	}, [createPackage.data, createPackage.error]);

	return (
		<div>
			<form onSubmit={handleSubmit(submitForm)} noValidate>
				<div className='w-8/12 space-y-1 grid grid-cols-1 gap-6 lg:grid-cols-2 items-start'>
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
						rows={3}
					/>

					<Input
						type='number'
						label='Price'
						placeholder='0.00'
						id='price'
						register={register}
						errors={errors}
					/>

					<div className='self-center'>
						<div className='flex flex-row items-center'>
							<input
								type='file'
								id='imageSrc'
								{...register?.('imageSrc', {
									onChange: e => {
										setSelectedFile(e.target.files[0]);
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
								{selectedFile
									? selectedFile.name
									: 'No file chosen'}
							</label>
						</div>
						{errors.imageSrc && (
							<p className='text-red-500'>
								{errors.imageSrc.message as string}
							</p>
						)}
					</div>

					<Input
						type='text-area'
						label='Package Features'
						placeholder='Please input the features of the package separated by semi-colons'
						id='features'
						register={register}
						errors={errors}
						rows={3}
					/>

					<Input
						type='select'
						label='Select Flight'
						placeholder='Flight'
						id='flight'
						selectOptions={[
							'None',
							...products
								.filter(product => product.type === 'flight')
								.map(product => product.name),
						]}
						register={register}
						errors={errors}
					/>

					<Input
						type='select'
						label='Select Hotel'
						placeholder='Hotel'
						id='hotel'
						selectOptions={[
							'None',
							...products
								.filter(product => product.type === 'hotel')
								.map(product => product.name),
						]}
						register={register}
						errors={errors}
					/>

					<Input
						type='select'
						label='Select Activity'
						placeholder='Activity'
						id='activity'
						selectOptions={[
							'None',
							...products
								.filter(product => product.type === 'activity')
								.map(product => product.name),
						]}
						register={register}
						errors={errors}
					/>
				</div>

				<Button extraClasses='px-12 mt-4 max-w-sm flex justify-center'>
					{createPackage.isPending && <Spinner />}
					{mode === 'create' ? 'Create Item' : 'Edit Item'}
				</Button>
			</form>

			<Message
				title='Flight creation error'
				subtitle={`${createPackage?.error?.message}`}
				Icon={ExclamationCircleIcon}
				iconColor='text-red-500'
				show={showError}
				setShow={setShowError}
			/>
		</div>
	);
};

export default PackageForm;
