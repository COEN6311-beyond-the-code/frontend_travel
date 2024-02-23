import {
	Dispatch,
	FC,
	Fragment,
	SetStateAction,
	SVGProps,
	useEffect,
} from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { MessageParamType } from '@/types/message/message.types';
import { classNames } from '@/utils/classNames';

interface IProps extends MessageParamType {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
}

const Message: FC<IProps> = ({
	Icon,
	title,
	subtitle,
	iconColor,
	show,
	setShow,
	duration,
	actionButton,
}) => {
	useEffect(() => {
		let timeoutId: any;
		if (show && duration !== 'infinite') {
			timeoutId = setTimeout(() => {
				setShow(false);
			}, duration ?? 5000);
		}

		return () => {
			clearTimeout(timeoutId);
		};

		// eslint-disable-next-line
	}, [show]);

	useEffect(() => {
		return () => {
			setShow(false);
		};

		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div
				aria-live='assertive'
				className='fixed z-[100] inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start'
			>
				<div className='w-full flex flex-col items-center space-y-4 sm:items-end'>
					<Transition
						show={subtitle ? show : false}
						as={Fragment}
						enter='transform ease-out duration-300 transition'
						enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
						enterTo='translate-y-0 opacity-100 sm:translate-x-0'
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
							<div className='p-4'>
								<div className='flex items-start'>
									<div className='flex-shrink-0'>
										{Icon ? (
											<Icon
												className={classNames(
													iconColor
														? iconColor
														: 'text-edanra-green',
													'h-6 w-6',
												)}
												aria-hidden='true'
											/>
										) : (
											<CheckCircleIcon
												className={classNames(
													iconColor
														? iconColor
														: 'text-edanra-green',
													'h-6 w-6',
												)}
												aria-hidden='true'
											/>
										)}
									</div>
									<div className='ml-3 w-0 flex-1 pt-0.5'>
										<p className='text-sm font-medium text-gray-900 truncate'>
											{title}
										</p>
										<p className='mt-1 text-sm text-gray-500'>
											{subtitle}
										</p>
										{actionButton && (
											<button
												className='underline text-sm'
												onClick={actionButton.func}
											>
												{actionButton.text}
											</button>
										)}
									</div>
									<div className='ml-4 flex-shrink-0 flex'>
										<button
											type='button'
											className='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-edanra-green'
											onClick={() => {
												setShow(false);
											}}
										>
											<span className='sr-only'>
												Close
											</span>
											<XMarkIcon
												className='h-5 w-5'
												aria-hidden='true'
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	);
};

export default Message;
