import { FC, useState } from 'react';
import { Order } from '@/types/dashboard/orders';
import { classNames } from '@/utils/classNames';
import ConfirmCancel from '@/components/message/confirm-cancel';
import { Product } from '@/types/product/product';
import useOrder from '@/hooks/order/useOrder';
import OrderDetails from '@/components/dashboard/shared/orders/order-details';
import { products } from '@/data/packages';

interface IProps {
	orders: Order[];
}

const OrdersTable: FC<IProps> = ({ orders }) => {
	const [itemToCancel, setItemToCancel] = useState<Order | Product | null>(
		null,
	);
	const [open, setOpen] = useState(false);
	const { cancelOrder } = useOrder();
	const handleCancel = () => {
		if (itemToCancel && 'orderNumber' in itemToCancel) {
			cancelOrder.mutate({
				orderNumber: itemToCancel.orderNumber,
			});
		}
		setItemToCancel(null);
	};
	const [openDetails, setOpenDetails] = useState(false);
	const [activeOrder, setActiveOrder] = useState<Product[] | null>(
		products.slice(0, 3),
	);
	const [orderNumber, setOrderNumber] = useState('');

	const getStatusColor = (status: string): string => {
		if (
			status === 'Pending Departure' ||
			status === 'Traveling' ||
			status === 'Pending Payment'
		) {
			return 'text-orange-500';
		} else if (status === 'Complete') {
			return 'text-green-600';
		} else {
			return 'text-gray-500';
		}
	};
	return (
		<div className='mt-8 flow-root'>
			<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
					<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
									>
										Package name
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Description
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Price
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Ordered on
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Status
									</th>
									<th
										scope='col'
										className='relative py-3.5 pl-3 pr-4 sm:pr-6'
									>
										<span className='sr-only'>
											View Details
										</span>
									</th>
									<th
										scope='col'
										className='relative py-3.5 pl-3 pr-4 sm:pr-6'
									>
										<span className='sr-only'>Cancel</span>
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-200 bg-white'>
								{orders.map(order => (
									<tr key={order.id}>
										<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
											{order.name}
										</td>
										<td className='px-3 py-4 text-sm text-gray-500 w-[30%]'>
											<p className='line-clamp-1'>
												{order.description}
											</p>
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											$ {order.price}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											{order.createdAt}
										</td>
										<td
											className={classNames(
												getStatusColor(order.status),
												'whitespace-nowrap px-3 py-4 text-sm capitalize',
											)}
										>
											{order.status}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											<button
												className='hover:text-ct-deepPink'
												onClick={() => {
													// TODO: Set active order
													setActiveOrder(order.items);
													setOpenDetails(true);
													setOrderNumber(
														order.orderNumber,
													);
												}}
											>
												View Details
											</button>
										</td>
										{order.status !== 'Complete' &&
											order.status !== 'Cancelled' && (
												<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
													<div
														className='text-red-600 hover:opacity-80 cursor-pointer'
														onClick={() => {
															setItemToCancel(
																order,
															);
															setOpen(true);
														}}
													>
														Cancel
														<span className='sr-only'>
															, {order.name}
														</span>
													</div>
												</td>
											)}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<ConfirmCancel
				title='Cancel order'
				message='Are you sure you want to cancel your order? This action cannot be undone.'
				open={open}
				setOpen={setOpen}
				setItemToCancel={setItemToCancel}
				handleConfirm={handleCancel}
			/>
			<OrderDetails
				open={openDetails}
				setOpen={setOpenDetails}
				activeOrder={activeOrder!}
				setActiveOrder={setActiveOrder}
				orderNumber={orderNumber}
				setOrderNumber={setOrderNumber}
				isAgentPage={false}
			/>
		</div>
	);
};

export default OrdersTable;
