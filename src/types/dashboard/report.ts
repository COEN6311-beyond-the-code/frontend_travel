import { Product } from '@/types/product/product';

export interface ReportDetail {
	totalOrderCount: number;
	canceledOrderCount: number;
	successOrderCount: number;
	successRate: number;
	totalRevenue: number;
	totalFlightRevenue: number;
	totalHotelRevenue: number;
	totalActivityRevenue: number;
}

export interface Report {
	reportDetail: ReportDetail;
	topPackage: Product[];
}
