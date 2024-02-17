import React, { FC } from 'react';
import { InputTypes } from '@/types/form/input.types';
import { classNames } from '@/utils/classNames';

const Input: FC<InputTypes> = ({
	type,
	label,
	placeholder,
	id,
	selectOptions,
	disabled,
	extraClasses,
	wrapperClasses,
	rows,
	errors,
	defaultValue,
	register,
	formatSelect,
	checked,
	onChange,
	max,
	min,
	value,
	subLabel,
	noCheckBoxError,
	inputKey,
	defaultChecked,
	hideError,
}) => {
	return type === 'checkbox' ? (
		<label
			className={classNames(wrapperClasses ?? '', 'text-sm px-1 py-0.5')}
		>
			<div className='block flex mb-2 items-center'>
				<input
					id={id}
					aria-describedby='comments-description'
					name='comments'
					type='checkbox'
					checked={checked}
					disabled={disabled}
					defaultChecked={defaultChecked}
					defaultValue={defaultValue}
					onChange={onChange}
					{...register?.(id)}
					key={inputKey}
					className={classNames(
						extraClasses ?? '',
						'h-5 w-5 rounded disabled:cursor-not-allowed !placeholder-gray-400 border-gray-300 ' +
							'text-ct-deepPink focus:ring-edanra-lightGreen mr-3',
					)}
				/>
				{label ?? ''}
			</div>
			{!noCheckBoxError && (
				<p className='text-red-500 mt-1 text-small h-[16px]'>
					{errors && errors[id]?.message}
				</p>
			)}
		</label>
	) : type === 'select' ? (
		<label
			className={classNames(
				wrapperClasses ?? '',
				'w-full max-w-sm mb-2 block px-1 py-0.5',
			)}
		>
			{label ?? ''}
			<p className='text-sm'>{subLabel}</p>
			<select
				className='block disabled:cursor-not-allowed appearance-none w-full
				border-gray-200 py-3 px-5 mt-1 rounded-lg leading-tight
				focus:border-black focus:ring-black focus:outline-0
				disabled:text-gray-200'
				id={id}
				disabled={disabled}
				value={value}
				defaultValue={defaultValue}
				{...register?.(id, {
					onChange,
				})}
			>
				<option value='' disabled>
					Select {label.replace(label[0], label[0].toLowerCase())}
				</option>
				{selectOptions?.map((option, index) => (
					<option
						key={index}
						value={
							formatSelect
								? option.toLowerCase().split(' ').join('_')
								: option.toLowerCase()
						}
					>
						{option}
					</option>
				))}
			</select>

			<p className='text-red-500 mt-1 text-small h-[16px]'>
				{errors && errors[id]?.message}
			</p>
		</label>
	) : type === 'text-area' ? (
		<label
			className={classNames(
				wrapperClasses ?? '',
				'w-full max-w-sm mb-2 block px-1 py-0.5',
			)}
		>
			{label}
			<p className='text-sm text-gray-400 my-1'>{subLabel}</p>
			<textarea
				rows={rows}
				disabled={disabled}
				placeholder={placeholder}
				defaultValue={defaultValue}
				key={inputKey}
				className='block disabled:cursor-not-allowed w-full rounded-lg px-5 py-3
				border-gray-200 mt-1 !placeholder-gray-400 focus:border-edanra-green
				focus:ring-edanra-green'
				id={id}
				{...register?.(id, {
					onChange,
				})}
			/>
			<p className='text-red-500 mt-1 text-small h-[16px]'>
				{errors && errors[id]?.message}
			</p>
		</label>
	) : (
		<label
			className={classNames(
				wrapperClasses ?? '',
				'w-full max-w-sm mb-2 block px-1 py-0.5',
			)}
		>
			{label}
			<p className='text-sm text-gray-400 my-1'>{subLabel}</p>

			<input
				disabled={disabled}
				type={type}
				max={max}
				min={min}
				value={value}
				key={inputKey}
				placeholder={placeholder}
				defaultValue={defaultValue}
				id={id}
				{...register?.(id, {
					onChange,
				})}
				className='block disabled:cursor-not-allowed w-full rounded-lg px-5 py-3 border-gray-200 mt-1
                !placeholder-gray-400 focus:border-black focus:ring-black focus:outline-0'
			/>

			{hideError ? null : (
				<p className='text-red-500 mt-1 text-small h-[16px]'>
					{errors && errors[id]?.message}
				</p>
			)}
		</label>
	);
};

export default Input;
