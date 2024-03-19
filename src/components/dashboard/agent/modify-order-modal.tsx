import { Dispatch, FC, Fragment, SetStateAction, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { classNames } from '@/utils/classNames';
import { inter } from '@/utils/fonts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModifyOrder, Order } from '@/types/dashboard/orders';
import { ModifyOrderSchema } from '@/schema/order-schema';
import Input from '@/components/input/input';
import { Product } from '@/types/product/product';
import useOrder from '@/hooks/order/useOrder';

interface IProps {
	open: boolean;
	setOpen: (value: boolean) => void;
	itemToModify: Order | null;
	setItemToModify: Dispatch<SetStateAction<Order | null>>;
}

const ModifyOrderModal: FC<IProps> = ({
	open,
	setOpen,
	itemToModify,
	setItemToModify,
}) => {
	const cancelButtonRef = useRef(null);
	const { modifyOrder } = useOrder();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ModifyOrder>({
		resolver: yupResolver(ModifyOrderSchema),
	});

	const submitForm: SubmitHandler<ModifyOrder> = async data => {
		console.log(data);
		if (itemToModify && 'orderNumber' in itemToModify) {
			modifyOrder.mutate(
				{
					orderNumber: itemToModify.orderNumber,
					startDate: data.startDate,
					endDate: data.endDate,
				},
				{
					// TODO: Close the modal when backend request is successful
					onSuccess: () => {
						setOpen(false);
					},
				},
			);
		}
		setItemToModify(null);
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as='div'
				className={classNames(inter.className, 'relative z-50')}
				initialFocus={cancelButtonRef}
				onClose={setOpen}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						>
							<Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
								<div>
									<div className='mt-3 text-center sm:mt-5'>
										<Dialog.Title
											as='h3'
											className='text-base font-semibold leading-6 text-gray-900'
										>
											Modify Order
										</Dialog.Title>
										<div className='mt-2'>
											<p className='text-sm text-gray-500'>
												You can modify the order details
												here.
											</p>
										</div>
									</div>
								</div>
								<form
									onSubmit={handleSubmit(submitForm)}
									className='mt-5'
								>
									<div className='flex flex-col w-full'>
										<Input
											type='date'
											label='Start Date'
											placeholder='Start Date'
											id='startDate'
											register={register}
											errors={errors}
											wrapperClasses='!max-w-lg'
										/>

										<Input
											type='date'
											label='End Date'
											placeholder='End Date'
											id='endDate'
											register={register}
											errors={errors}
											wrapperClasses='!max-w-lg'
										/>
									</div>

									<div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
										<button
											type='submit'
											className='inline-flex w-full justify-center rounded-md bg-ct-deepPink px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2'
										>
											{/*TODO: Add spinner*/}
											{/*{isPending && <Spinner />}*/}
											Modify
										</button>
										<button
											type='button'
											className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0'
											onClick={() => setOpen(false)}
											ref={cancelButtonRef}
										>
											Cancel
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default ModifyOrderModal;
