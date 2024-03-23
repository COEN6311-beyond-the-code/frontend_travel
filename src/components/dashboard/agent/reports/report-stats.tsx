// const stats = [
// 	{ name: 'Total bookings', value: '405' },
// 	{ name: 'Canceled bookings', value: '2' },
// 	{ name: 'Successful bookings', value: '403' },
// 	{ name: 'Success rate', value: '98.5%' },
// 	{ name: 'Total package revenue', value: '20,000' },
// 	{ name: 'Total flight revenue', value: '4,000' },
// 	{ name: 'Total hotel revenue', value: '3,000' },
// 	{ name: 'Total activity revenue', value: '3,000' },
// ];

import { Report } from '@/types/dashboard/report';
import { FC } from 'react';

interface IProps {
	report: Report;
}

const ReportStats: FC<IProps> = ({ report }) => {
	const stats = [
		{
			name: 'Total bookings',
			value: report?.reportDetail.totalOrderCount.toString(),
		},
		{
			name: 'Canceled bookings',
			value: report?.reportDetail.canceledOrderCount.toString(),
		},
		{
			name: 'Successful bookings',
			value: report?.reportDetail.successOrderCount.toString(),
		},
		{
			name: 'Success rate',
			value: (report?.reportDetail.successRate.toFixed(1) ?? '') + '%',
		},
		{
			name: 'Total package revenue',
			value: report?.reportDetail.totalRevenue.toLocaleString(),
		},
		{
			name: 'Total flight revenue',
			value: report?.reportDetail.totalFlightRevenue.toLocaleString(),
		},
		{
			name: 'Total hotel revenue',
			value: report?.reportDetail.totalHotelRevenue.toLocaleString(),
		},
		{
			name: 'Total activity revenue',
			value: report?.reportDetail.totalActivityRevenue.toLocaleString(),
		},
	];
	return (
		<div className='bg-gray-900 mt-5 mb-10 rounded-2xl'>
			<div className='mx-auto max-w-7xl'>
				<div className='grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4'>
					{stats.map(stat => (
						<div
							key={stat.name}
							className='bg-gray-900 px-4 py-6 sm:px-6 lg:px-8'
						>
							<p className='text-sm font-medium leading-6 text-gray-400'>
								{stat.name}
							</p>
							<p className='mt-2 flex items-baseline gap-x-2'>
								<span className='text-4xl font-semibold tracking-tight text-white'>
									{stat.value}
								</span>
								{/*{stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}*/}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ReportStats;
