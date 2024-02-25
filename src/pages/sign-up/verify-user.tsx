import Layout from '@/components/layout/layout';
import AwaitingAction from '@/components/awaiting-action/awaiting-action';

const VerifyUser = () => {
	return (
		<Layout title='Verifying User' hideNav={true} hideFooter={true}>
			<AwaitingAction
				title='Verifying user..'
				message='Please click the verification link sent to
                    your email. Refresh this page after completing the verification'
			/>
		</Layout>
	);
};

export default VerifyUser;
