import AwaitingAction from '@/components/awaiting-action/awaiting-action';
import Layout from '@/components/layout/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Message from '@/components/message/message';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import useOrder from '@/hooks/order/useOrder';
import Cookies from 'js-cookie';
import useCart from '@/hooks/cart/useCart';

const CreateOrder = () => {
	const router = useRouter();
	const [error, setError] = useState<any>(null);
	const [show, setShow] = useState(false);
	const p = '1234';
	const { placeOrder } = useOrder();
	const { cartCheckout } = useCart();

	useEffect(() => {
		if (
			router.query.payment_intent &&
			router.query.payment_intent_client_secret &&
			router.query.redirect_status
		) {
			const {
				payment_intent,
				payment_intent_client_secret,
				redirect_status,
			} = router.query;

			if (
				!payment_intent &&
				!payment_intent_client_secret &&
				!redirect_status
			) {
				setError(
					'An error occurred while processing your order. Please try again. If the problem persists, contact support.',
				);
				setShow(true);
			} else {
				cartCheckout.mutate({});
			}
		}

		// eslint-disable-next-line
	}, [router]);

	useEffect(() => {
		if (cartCheckout.data) {
			const checkoutResponse = cartCheckout.data.data.data.package_items;
			const checkoutDataCookie = Cookies.get('checkoutData');

			if (checkoutDataCookie) {
				const checkoutData = JSON.parse(checkoutDataCookie);
				placeOrder.mutate({
					departureDate: checkoutData.departureDate,
					endDate: checkoutData.endDate,
					email: checkoutData.email,
					phone: checkoutData.phone,
					packageId: checkoutResponse.id,
				});
			}
		}

		// eslint-disable-next-line
	}, [cartCheckout.data]);

	useEffect(() => {
		if (placeOrder.data) {
			Cookies.remove('checkoutData');
			router.push('/dashboard/user/order-history').then();
		}
	}, [placeOrder.data, router]);

	return (
		<Layout title='Verifying User' hideNav={true} hideFooter={true}>
			{error ? (
				<AwaitingAction
					title='Error'
					message='Failed to process order'
					error={error}
				/>
			) : (
				<AwaitingAction
					title='Placing order...'
					message="Please wait while we finalize your order. You'll be redirected to your dashboard after your order is placed."
				/>
			)}

			<Message
				title='An error occurred'
				subtitle='An error occurred while processing your order. Please try again. If the problem persists, contact support.'
				show={show}
				setShow={setShow}
				iconColor={'text-red-500'}
				Icon={ExclamationCircleIcon}
			/>
		</Layout>
	);
};

export default CreateOrder;
