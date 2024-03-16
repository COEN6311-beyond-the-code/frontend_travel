import { FC, Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/utils/classNames';
import FlightForm from '@/components/dashboard/agent/package-form/item-forms/flight-form';
import HotelForm from '@/components/dashboard/agent/package-form/item-forms/hotel-form';
import ActivityForm from '@/components/dashboard/agent/package-form/item-forms/activity-form';

interface IProps {
	mode: 'create' | 'edit';
	type?: string;
}

const ItemForm: FC<IProps> = ({ mode, type }) => {
	const [currentItemType, setCurrentItemType] = useState('flight');

	useEffect(() => {
		if (mode === 'edit' && type) {
			setCurrentItemType(type);
		}
	}, [type, mode]);

	return (
		<div className='-mt-5'>
			{mode === 'create' && (
				<Menu as='div' className='relative inline-block text-left mb-8'>
					<div>
						<Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
							<div className='capitalize'>
								{currentItemType
									? currentItemType
									: 'Item Type'}
							</div>
							<ChevronDownIcon
								className='-mr-1 h-5 w-5 text-gray-400'
								aria-hidden='true'
							/>
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items className='absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
							<div className='py-1'>
								<Menu.Item>
									{({ active }) => (
										<div
											className={classNames(
												currentItemType === 'flight'
													? 'bg-gray-100 text-gray-900'
													: 'text-gray-700',
												'block px-4 py-2 text-sm cursor-pointer',
											)}
											onClick={() =>
												setCurrentItemType('flight')
											}
										>
											Flight
										</div>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<div
											className={classNames(
												currentItemType === 'hotel'
													? 'bg-gray-100 text-gray-900'
													: 'text-gray-700',
												'block px-4 py-2 text-sm cursor-pointer',
											)}
											onClick={() =>
												setCurrentItemType('hotel')
											}
										>
											Hotel
										</div>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<div
											className={classNames(
												currentItemType === 'activity'
													? 'bg-gray-100 text-gray-900'
													: 'text-gray-700',
												'block px-4 py-2 text-sm cursor-pointer',
											)}
											onClick={() =>
												setCurrentItemType('activity')
											}
										>
											Activity
										</div>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			)}

			{currentItemType === 'flight' && <FlightForm mode={mode} />}

			{currentItemType === 'hotel' && <HotelForm mode={mode} />}

			{currentItemType === 'activity' && <ActivityForm mode={mode} />}
		</div>
	);
};

export default ItemForm;
