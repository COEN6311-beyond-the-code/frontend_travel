import { SubmitHandler, useForm } from 'react-hook-form';
import {
	ActivityFormType,
	FlightFormType,
	Product,
	PromotionFormType,
} from '@/types/product/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Spinner from '@/components/loaders/spinner';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import Message from '@/components/message/message';
import useProduct from '@/hooks/product/useProduct';
import { useRouter } from 'next/router';
import PageLoader from '@/components/loaders/page-loader';
import { Promotion } from '@/types/dashboard/promotion';
import toCamelCase from '@/utils/camel-case';

interface IProps {}

const PromotionForm: FC<IProps> = ({}) => {
	const [showMessage, setShowMessage] = useState(false);
	const router = useRouter();
	const [productId, setProductId] = useState<string | null>(null);
	const [productType, setProductType] = useState<string | null>(null);
	const [promotion, setPromotion] = useState<Promotion | null>(null);
	const { getPromotion, createPromotion, updatePromotion } = useProduct(
		productId!,
		productType!,
	);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		reset,
	} = useForm<PromotionFormType>();

	useEffect(() => {
		if (router.query) {
			setProductId(router.query.item_id as string);
		}

		if (router.query.type) {
			setProductType(router.query.type as string);
		}
	}, [router]);

	useEffect(() => {
		if (getPromotion.data) {
			setPromotion(toCamelCase(getPromotion.data.data.data));
		}
	}, [getPromotion.data]);

	useEffect(() => {
		if (promotion) {
			reset({
				browseTimes: promotion.browseTimes,
				windowsTime: promotion.windowsTime,
				waitTime: promotion.waitTime,
			});
		}
	}, [promotion, reset]);

	const onSubmit: SubmitHandler<PromotionFormType> = data => {
		if (!productType || !productId) return;
		if (promotion?.id) {
			updatePromotion.mutate({
				...data,
				id: promotion.id,
			});
		} else {
			createPromotion.mutate({
				...data,
				category: productType,
				itemId: +productId,
			});
		}
		setShowMessage(true);
	};

	if (!promotion) {
		return <PageLoader />;
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='space-y-4'>
					<div className='text-sm text-gray-600 mb-4'>
						The promotional notification feature means that if a
						user views a product more than ‘browseTimes’ within a
						‘windowsTime’ and does not place an order within
						‘waitTime’, the system will automatically send an email
						to inform the customer about the product information,
						encouraging them to make a purchase.
					</div>
					<Input
						type='number'
						label='Browse Times'
						placeholder='browseTimes'
						id='browseTimes'
						register={register}
						errors={errors.browseTimes}
					/>
					<Input
						type='number'
						label='Windows Time(Second)'
						placeholder='windowsTime'
						id='windowsTime'
						register={register}
						errors={errors.windowsTime}
					/>
					<Input
						type='number'
						label='Wait Time(Second)'
						placeholder='waitTime'
						id='waitTime'
						register={register}
						errors={errors.waitTime}
					/>
				</div>
				<Button type='submit'>Save Change</Button>
			</form>

			<Message
				title='Configuration successful'
				subtitle='The promotion will be activated within five minutes.'
				iconColor='text-red-500'
				show={showMessage}
				setShow={setShowMessage}
			/>
		</div>
	);
};

export default PromotionForm;
