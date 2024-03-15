import { SubmitHandler, useForm } from 'react-hook-form';
import { ActivityFormType, Product } from '@/types/product/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { ActivitySchema } from '@/schema/item-schema';
import { FC, useEffect, useState } from 'react';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Spinner from '@/components/loaders/spinner';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import Message from '@/components/message/message';
import useProduct from '@/hooks/product/useProduct';
import { useRouter } from 'next/router';
import PageLoader from '@/components/loaders/page-loader';

interface IProps {
	mode: 'create' | 'edit';
}

const ActivityForm: FC<IProps> = ({ mode }) => {
	const [showError, setShowError] = useState(false);
	const router = useRouter();
	const [productId, setProductId] = useState<string | null>(null);
	const [productType, setProductType] = useState<string | null>(null);
	const [product, setProduct] = useState<Product | null>(null);
	const { createActivity, getProduct, updateActivity } = useProduct(
		productId!,
		productType!,
	);

	const {
		register: activityRegister,
		handleSubmit: handleActivitySubmit,
		setError: activitySetErrors,
		formState: { errors: activityErrors },
		reset,
	} = useForm<ActivityFormType>({
		resolver: yupResolver(ActivitySchema),
	});

	const submitActivityForm: SubmitHandler<ActivityFormType> = data => {
		if (!selectedActivityFile && !product?.imageSrc) {
			activitySetErrors('imageSrc', {
				type: 'manual',
				message: 'Image is required',
			});
			return;
		}

		if (product && mode === 'edit') {
			updateActivity.mutate({
				...data,
				imageSrc: selectedActivityFile || product.imageSrc,
				id: product.id,
			});
		} else {
			createActivity.mutate(data);
		}
	};

	const [selectedActivityFile, setSelectedActivityFile] = useState<any>(null);

	useEffect(() => {
		if (getProduct.data) {
			setProduct(getProduct.data.data.data);
		}
	}, [getProduct.data]);

	useEffect(() => {
		if (createActivity.data || updateActivity.data) {
			router.push('/dashboard/agent/manage-packages').then();
		} else if (createActivity.error || updateActivity.error) {
			setShowError(true);
		}

		// eslint-disable-next-line
	}, [
		createActivity.data,
		createActivity.error,
		updateActivity.data,
		updateActivity.error,
	]);

	useEffect(() => {
		if (router.query) {
			setProductId(router.query.item_id as string);
		}

		if (router.query.type) {
			setProductType(router.query.type as string);
		}
	}, [router]);

	useEffect(() => {
		if (product) {
			reset({
				name: product.name,
				description: product.description,
				price: +product.price,
				startDate: product.start_date,
				endDate: product.end_date,
				location: product.details[0].items[1].split(':')[1],
				event: product.details[0].items[0].split(':')[1],
				address: product.details[0].items[2].split(':')[1],
				time: product.details[0].items[3].split(' ')[1],
			});
		}
	}, [product, reset]);

	if (mode === 'edit' && !product) {
		return <PageLoader />;
	}

	return (
		<div>
			<form
				onSubmit={handleActivitySubmit(submitActivityForm)}
				noValidate
			>
				<div className='w-8/12 space-y-1 grid grid-cols-1 gap-6 lg:grid-cols-2 items-start'>
					<Input
						type='text'
						label='Item name'
						placeholder='Activity 1'
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
									: product
										? product.imageSrc
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
					{(createActivity.isPending || updateActivity.isPending) && (
						<Spinner />
					)}
					{mode === 'create' ? 'Create Activity' : 'Edit Activity'}
				</Button>
			</form>

			<Message
				title='Activity creation error'
				subtitle={`${createActivity?.error?.message || updateActivity?.error?.message}`}
				Icon={ExclamationCircleIcon}
				iconColor='text-red-500'
				show={showError}
				setShow={setShowError}
			/>
		</div>
	);
};

export default ActivityForm;
