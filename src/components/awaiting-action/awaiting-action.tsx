import Spinner from '@/components/loaders/spinner';
import { FC } from 'react';

interface IProps {
	title: string;
	message: string;
	error?: boolean;
}

const AwaitingAction: FC<IProps> = ({ title, message, error }) => {
	return (
		<div className='min-h-screen w-full flex flex-col justify-center items-center'>
			<div className='text-center'>
				<h1 className='text-3xl font-medium mb-5'>{title}</h1>
				<p className='mx-auto mb-5 text-lg text-gray-600'>{message}</p>
			</div>
			{!error && (
				<Spinner color='text-ct-deepPink' extraClasses='!w-10 !h-10' />
			)}
		</div>
	);
};

export default AwaitingAction;
