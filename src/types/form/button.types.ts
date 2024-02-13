import { ReactNode } from 'react';

export interface ButtonTypes {
	id?: string;
	children: ReactNode;
	link?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
	onClick?: () => void;
	extraClasses?: string;
	disabled?: boolean;
}
