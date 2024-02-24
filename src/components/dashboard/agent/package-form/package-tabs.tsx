import { classNames } from '@/utils/classNames';
import { Dispatch, FC, SetStateAction } from 'react';

interface IProps {
	currentTab: string;
	setCurrentTab: Dispatch<SetStateAction<string>>;
}

const tabs = [{ name: 'Package' }, { name: 'Item' }];

const PackageTabs: FC<IProps> = ({ currentTab, setCurrentTab }) => {
	return (
		<div>
			<div className='sm:hidden mt-5'>
				<label htmlFor='tabs' className='sr-only'>
					Select a tab
				</label>
				{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
				<select
					id='tabs'
					name='tabs'
					className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
					defaultValue={tabs[0].name}
				>
					{tabs.map(tab => (
						<option key={tab.name}>{tab.name}</option>
					))}
				</select>
			</div>
			<div className='hidden sm:block mt-5'>
				<nav className='flex space-x-4' aria-label='Tabs'>
					{tabs.map(tab => (
						<div
							key={tab.name}
							className={classNames(
								tab.name === currentTab
									? 'bg-gray-100 text-gray-700'
									: 'text-gray-500 hover:text-gray-700',
								'rounded-md px-3 py-2 text-sm font-medium cursor-pointer',
							)}
							aria-current={
								tab.name === currentTab ? 'page' : undefined
							}
							onClick={() => setCurrentTab(tab.name)}
						>
							{tab.name}
						</div>
					))}
				</nav>
			</div>
		</div>
	);
};

export default PackageTabs;
