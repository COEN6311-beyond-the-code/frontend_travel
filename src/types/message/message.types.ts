import { SVGProps } from 'react';

export interface MessageParamType {
	title: string;
	subtitle: string;
	actionButton?: {
		text: string;
		func: () => void;
	};
	duration?: number | 'infinite';
	Icon?: any;
	iconColor?: string;
}
