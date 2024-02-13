import React, { FC } from 'react';
import Link from 'next/link';
import { classNames } from '@/utils/classNames';
import { ButtonTypes } from '@/types/form/button.types';

const Button: FC<ButtonTypes> = ({
	id,
	link,
	type,
	onClick,
	children,
	extraClasses,
	disabled,
}) => {
	return link ? (
		<Link href={link}>
			<button
				id={id}
				className={classNames(
					extraClasses,
					'px-6 py-3 rounded-md disabled:cursor-not-allowed text-white duration-300 bg-ct-deepPink',
				)}
			>
				{children}
			</button>
		</Link>
	) : (
		<button
			id={id}
			onClick={onClick}
			disabled={disabled}
			type={type}
			className={classNames(
				extraClasses,
				'px-6 py-3 rounded-md disabled:cursor-not-allowed bg-ct-deepPink text-white',
			)}
		>
			{children}
		</button>
	);
};

export default Button;
