import React, { SyntheticEvent, useEffect } from 'react';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { classNames } from '@/utils/classNames';
import { inter } from '@/utils/fonts';
import Button from '@/components/button/button';
import Spinner from '@/components/loaders/spinner';
import { useRouter } from 'next/router';
import useCart from '@/hooks/cart/useCart';
import Cookies from 'js-cookie';

function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = React.useState<null | string>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const frontendUrl =
		process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

	React.useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret',
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent!.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage(
						'Your payment was not successful, please try again.',
					);
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: `${frontendUrl}/checkout/create-order`,
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message as string);
		} else {
			setMessage('An unexpected error occurred.');
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: 'tabs',
	};

	return (
		<div
			className={classNames(
				inter.className,
				'w-screen h-screen flex items-center justify-center',
			)}
		>
			<form
				id='payment-form'
				className='text-center'
				onSubmit={handleSubmit}
			>
				<h1 className='font-medium text-2xl mb-2'>
					Finalize your booking.
				</h1>
				<p className='text-gray-600 mb-10'>
					Provide your payment details to complete your booking.
				</p>
				<PaymentElement
					id='payment-element'
					options={paymentElementOptions as any}
				/>
				<Button
					disabled={isLoading || !stripe || !elements}
					id='stripe-submit'
					extraClasses='px-10 w-full flex justify-center mt-2 !bg-black'
				>
					{isLoading && <Spinner />}
					Pay now
				</Button>
				{/* Show any error or success messages */}
				{message && <div id='payment-message'>{message}</div>}
			</form>
		</div>
	);
}

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function Pay() {
	const [clientSecret, setClientSecret] = React.useState('');
	const [cart, setCart] = React.useState<any>(null);
	const router = useRouter();
	const { getUserCart, packageCheckout } = useCart();

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		if (cart) {
			fetch('/api/create-payment-intent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ items: [cart] }),
			})
				.then(res => res.json())
				.then(data => setClientSecret(data.clientSecret));
		}
	}, [cart]);

	useEffect(() => {
		const packageToPurchase = Cookies.get('packageToPurchase');

		if (packageToPurchase) {
			packageCheckout.mutate({
				packageId: +packageToPurchase,
			});
		} else {
			if (getUserCart.data) {
				const item = getUserCart.data.data.data.cart;
				setCart(item);
			}
		}

		// eslint-disable-next-line
	}, [getUserCart.data]);

	useEffect(() => {
		if (packageCheckout.data) {
			const item = packageCheckout.data.data.data.cart;
			setCart(item);
		}
	}, [packageCheckout.data]);

	const appearance = {
		theme: 'stripe',
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className='App'>
			{clientSecret && (
				<Elements options={options as any} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}
