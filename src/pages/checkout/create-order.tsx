import AwaitingAction from '@/components/awaiting-action/awaiting-action';
import Layout from '@/components/layout/layout';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Message from '@/components/message/message';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import useOrder from '@/hooks/order/useOrder';
import Cookies from 'js-cookie';
import useCart from '@/hooks/cart/useCart';
import { AuthContext } from '@/context/auth/auth-context';

const CreateOrder = () => {
	const router = useRouter();
	const [error, setError] = useState<any>(null);
	const [show, setShow] = useState(false);
	const { placeOrder, paymentOrder } = useOrder();
	const { cartCheckout } = useCart();
	const { currentUser } = useContext(AuthContext);

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
				const packageToPurchase = Cookies.get('packageToPurchase');

				if (!packageToPurchase) {
					cartCheckout.mutate({});
				}
			}
		}

		// eslint-disable-next-line
	}, [router]);

	useEffect(() => {
		const packageToPurchase = Cookies.get('packageToPurchase');
		const checkoutDataCookie = Cookies.get('checkoutData');
		const placeOrderVariables: any = {};

		if (checkoutDataCookie) {
			const checkoutData = JSON.parse(checkoutDataCookie);
			placeOrderVariables.departureDate = checkoutData.departureDate;
			placeOrderVariables.endDate = checkoutData.endDate;
			placeOrderVariables.email = checkoutData.email;
			placeOrderVariables.phone = checkoutData.phone;
		}

		if (currentUser) {
			if (packageToPurchase) {
				placeOrder.mutate({
					...placeOrderVariables,
					packageId: +packageToPurchase,
				});
			} else if (cartCheckout.data) {
				const checkoutResponse =
					cartCheckout.data.data.data.package_items;
				placeOrder.mutate({
					...placeOrderVariables,
					packageId: checkoutResponse.id,
				});
			}
		}

		// eslint-disable-next-line
	}, [cartCheckout.data, currentUser]);

	useEffect(() => {
		if (placeOrder.data) {
			paymentOrder.mutate({
				orderNumber: placeOrder.data.data.data.order_number,
				amount: +placeOrder.data.data.data.amount,
			});
		}

		// eslint-disable-next-line
	}, [placeOrder.data]);

	useEffect(() => {
		if (paymentOrder.data) {
			Cookies.remove('checkoutData');
			Cookies.remove('packageToPurchase');
			router
				.push(
					`/dashboard/${currentUser?.userInfo.isAgent ? 'agent' : 'user'}/orders`,
				)
				.then();
		}

		// eslint-disable-next-line
	}, [paymentOrder.data, router]);

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
