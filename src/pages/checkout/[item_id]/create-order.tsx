import AwaitingAction from '@/components/awaiting-action/awaiting-action';
import Layout from '@/components/layout/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Message from '@/components/message/message';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';

const CreateOrder = () => {
	const router = useRouter();
	const [error, setError] = useState<any>(null);
	const [show, setShow] = useState(false);

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
			}
		}
	}, [router]);

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
					title='Placing order..'
					message='Please wait while we finalize your order'
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
