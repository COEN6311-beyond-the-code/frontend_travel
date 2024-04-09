import { Product } from '@/types/product/product';

export interface Promotion {
	id?: number;
	category?: string;
	itemId?: number;
	browseTimes: number;
	windowsTime: number;
	waitTime: number;
}
