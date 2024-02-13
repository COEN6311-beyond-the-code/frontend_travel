import type { FieldError, UseFormRegister } from 'react-hook-form';
import React, { ChangeEventHandler, ReactNode } from 'react';

export interface InputTypes {
	type: string;
	label: any;
	placeholder: string;
	id: string;
	selectOptions?: string[];
	disabled?: boolean;
	extraClasses?: string;
	keyword?: string;
	wrapperClasses?: string;
	rows?: number;
	register?: UseFormRegister<any>;
	errors?: any;
	defaultValue?: string | number;
	formatSelect?: boolean;
	checked?: boolean;
	onChange?: ChangeEventHandler<HTMLElement>;
	min?: number;
	max?: number;
	value?: string | number;
	subLabel?: string;
	noCheckBoxError?: boolean;
	inputKey?: any;
	defaultChecked?: boolean;
}
