import React, { FC, useEffect, useRef } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

const PriceRange: FC<{
	defaultMin: number;
	defaultMax: number;
	barMin: number;
	barMax: number;
	minInterval: number;
	setRangeValues: React.Dispatch<
		React.SetStateAction<{ price_min: number; price_max: number }>
	>;
	rangeValues: { price_min: number; price_max: number };
}> = ({
	defaultMax,
	defaultMin,
	barMin,
	barMax,
	minInterval,
	setRangeValues,
	rangeValues,
}) => {
	const leftRangeRef = useRef<null | HTMLInputElement>(null);
	const rightRangeRef = useRef<null | HTMLInputElement>(null);
	const thumbLeftRef = useRef<null | HTMLButtonElement>(null);
	const thumbRightRef = useRef<null | HTMLButtonElement>(null);
	const trackRef = useRef<null | HTMLDivElement>(null);
	const inputMaxRef = useRef<null | HTMLInputElement>(null);
	const inputMinRef = useRef<null | HTMLInputElement>(null);

	const getLeftPercentDifference = (value: number) => {
		const percent = ((value - barMin) / (barMax - barMin)) * 100;
		// width of thumb circle is 2.25rem
		const diff = (percent / 100) * 2.25;
		return `calc(${percent}% - ${diff}rem)`;
	};

	const getRightPercentDifference = (value: number) => {
		const percent = ((value - barMin) / (barMax - barMin)) * 100;
		// width of thumb circle is 2.25rem
		const diff = ((100 - percent) / 100) * 2.25;
		return `calc(${100 - percent}% - ${diff}rem)`;
	};

	const getMinValue = (
		value: number,
		rangeValue: string,
		type: 'add' | 'subtract',
	) => {
		return type === 'subtract'
			? Math.min(value, Number(rangeValue) - minInterval)
			: Math.min(value, Number(rangeValue) - minInterval);
	};

	const getMaxValue = (
		value: number,
		rangeValue: string,
		type: 'add' | 'subtract',
	) => {
		return type === 'add'
			? Math.max(value, Number(rangeValue) + minInterval)
			: Math.max(value, Number(rangeValue) + minInterval);
	};

	const setLeftValue = () => {
		if (
			leftRangeRef.current &&
			rightRangeRef.current &&
			thumbLeftRef.current &&
			trackRef.current &&
			inputMinRef.current
		) {
			let value = Number(leftRangeRef.current.value);
			// return the minimum value between the value of the left and right inputs.
			// this ensures that, once it crosses the value of the right, it remains at that value
			// as the right value becomes the minimum
			value = getMinValue(value, rightRangeRef.current.value, 'subtract');
			setRangeValues({ ...rangeValues, price_min: Number(value) });
			thumbLeftRef.current.style.left = getLeftPercentDifference(value);
			trackRef.current.style.left = getLeftPercentDifference(value);
		}
	};

	const setRightValue = () => {
		if (
			rightRangeRef.current &&
			rightRangeRef.current &&
			leftRangeRef.current &&
			inputMaxRef.current &&
			thumbRightRef.current &&
			trackRef.current
		) {
			let value = Number(rightRangeRef.current.value);
			value = getMaxValue(value, leftRangeRef.current.value, 'add');
			setRangeValues({ ...rangeValues, price_max: Number(value) });
			inputMaxRef.current.value = value.toString();
			thumbRightRef.current.style.right =
				getRightPercentDifference(value);
			trackRef.current.style.right = getRightPercentDifference(value);
		}
	};

	const changeLeftNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = Number(e.target.value);
		if (
			rightRangeRef.current &&
			thumbLeftRef.current &&
			trackRef.current &&
			inputMinRef.current
		) {
			if (value < barMin) {
				value = barMin;
			}
			if (value > Number(rightRangeRef.current.value) - minInterval) {
				value = Number(rightRangeRef.current.value) - minInterval;
			}
			if (value.toString() === '') {
				value = 0;
			}
			value = getMinValue(value, rightRangeRef.current.value, 'add');
			setRangeValues({ ...rangeValues, price_min: Number(value) });
			thumbLeftRef.current.style.left = getLeftPercentDifference(value);
			trackRef.current.style.left = getLeftPercentDifference(value);
		}
		return value;
	};

	const handleChangeLeftRange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = changeLeftNumber(e);
		if (
			rightRangeRef.current &&
			thumbLeftRef.current &&
			trackRef.current &&
			inputMinRef.current
		) {
			inputMinRef.current.value = value.toString();
		}
	};

	const changeRightNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (
			inputMaxRef.current &&
			leftRangeRef.current &&
			thumbRightRef.current &&
			trackRef.current
		) {
			let value = Number(e.target.value);
			if (value > barMax) {
				value = barMax;
				inputMaxRef.current.value = value.toString();
			}
			if (value < Number(leftRangeRef.current.value) + minInterval) {
				value = Number(leftRangeRef.current.value) + minInterval;
			}
			if (value.toString() === '') {
				value = Number(leftRangeRef.current.value) + minInterval;
				inputMaxRef.current.value =
					leftRangeRef.current.value + minInterval;
			}
			setRangeValues({ ...rangeValues, price_max: Number(value) });
			value = getMaxValue(value, leftRangeRef.current.value, 'subtract');
			thumbRightRef.current.style.right =
				getRightPercentDifference(value);
			trackRef.current.style.right = getRightPercentDifference(value);
		}
	};

	useEffect(() => {
		leftRangeRef.current && setLeftValue();
		rightRangeRef.current && setRightValue();
		// eslint-disable-next-line
	}, []);

	// click listeners
	const activeLeft = () => {
		thumbLeftRef.current &&
			thumbLeftRef.current.classList.add('range-thumb-active');
	};
	const inactiveLeft = () => {
		thumbLeftRef.current &&
			thumbLeftRef.current.classList.remove('range-thumb-active');
	};
	const activeRight = () => {
		thumbRightRef.current &&
			thumbRightRef.current.classList.add('range-thumb-active');
	};
	const inactiveRight = () => {
		thumbRightRef.current &&
			thumbRightRef.current.classList.remove('range-thumb-active');
	};

	//reset range
	const resetRange = () => {
		if (
			inputMaxRef.current &&
			thumbLeftRef.current &&
			trackRef.current &&
			thumbRightRef.current &&
			trackRef.current
		) {
			setRangeValues({
				...rangeValues,
				price_min: barMin,
				price_max: barMax,
			});
			inputMaxRef.current.value = barMax.toString();

			const leftPercent =
				((defaultMin - barMin) / (barMax - barMin)) * 100;
			thumbLeftRef.current.style.left = leftPercent + '%';
			trackRef.current.style.left = leftPercent + '%';

			const rightPercent =
				((defaultMax - barMin) / (barMax - barMin)) * 100;
			thumbRightRef.current.style.right = 100 - rightPercent + '%';
			trackRef.current.style.right = 100 - rightPercent + '%';
		}
	};

	const checkMinNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = Number(e.target.value);
		if (
			rightRangeRef.current &&
			thumbLeftRef.current &&
			trackRef.current &&
			inputMinRef.current
		) {
			if (value < barMin) {
				value = barMin;
				setRangeValues({ ...rangeValues, price_min: Number(value) });
				value = Math.min(
					value,
					Number(rightRangeRef.current.value + minInterval),
				);
				setRangeValues({ ...rangeValues, price_min: Number(value) });
				inputMinRef.current.value = value.toString();
				thumbLeftRef.current.style.left =
					getLeftPercentDifference(value);
				trackRef.current.style.left = getLeftPercentDifference(value);
			}
			if (value > rangeValues.price_min) {
				inputMinRef.current.value = rangeValues.price_min.toString();
			}
		}
	};

	const checkMaxNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = Number(e.target.value);
		if (
			inputMaxRef.current &&
			leftRangeRef.current &&
			thumbRightRef.current &&
			trackRef.current
		) {
			if (value < barMin) {
				value = rangeValues.price_max;
				setRangeValues({ ...rangeValues, price_max: Number(value) });
				value = Math.max(
					value,
					Number(leftRangeRef.current.value) - minInterval,
				);
				inputMaxRef.current.value = rangeValues.price_max.toString();
				thumbRightRef.current.style.right =
					getRightPercentDifference(value);
				trackRef.current.style.right = getRightPercentDifference(value);
			}
		}
	};

	useEffect(() => {
		rangeValues.price_min === defaultMin &&
			rangeValues.price_max === defaultMax &&
			resetRange();
		//eslint-disable-next-line
	}, [rangeValues.price_max, rangeValues.price_min, defaultMin, defaultMax]);

	return (
		<div className='w-full overflow-hidden px-[2px]'>
			<div className='my-6 relative h-[1px] w-full bg-red mx-auto slider-container'>
				<input
					type='range'
					onInput={setLeftValue}
					ref={leftRangeRef}
					className='w-full -translate-y-1/2 z-20'
					min={barMin}
					max={barMax}
					value={rangeValues.price_min}
					onChange={handleChangeLeftRange}
					onMouseDown={activeLeft}
					onMouseUp={inactiveLeft}
				/>
				<input
					type='range'
					ref={rightRangeRef}
					onInput={setRightValue}
					className='w-full -translate-y-1/2 z-20'
					min={barMin}
					max={barMax}
					value={rangeValues.price_max}
					onMouseDown={activeRight}
					onMouseUp={inactiveRight}
					onChange={changeRightNumber}
				/>
				{/*tracks*/}

				{/*track background*/}
				<div className='w-full absolute !inset-0 bg-gray-200 z-10 rounded-sm' />

				{/*main track*/}
				<div
					className='absolute inset-0 z-20 rounded-sm bg-gray-400 left-1/4 right-1/2'
					ref={trackRef}
				/>
				{/*left thumb*/}
				<button
					className='absolute pointer-events-none duration-300 transition-transform -top-[1.125rem] bg-white w-9 h-9 rounded-full border border-gray-400  flex items-center justify-center outline-0 z-20'
					ref={thumbLeftRef}
				>
					<Bars3Icon className='w-4 text-gray-400 rotate-90 pointer-events-none' />
				</button>
				{/*right thumb*/}
				<button
					className='absolute pointer-events-none duration-300 transition-transform right-1/4 bg-white -top-[1.125rem] w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center outline-0 z-20'
					ref={thumbRightRef}
				>
					<Bars3Icon className='w-4 text-gray-400 rotate-90 pointer-events-none' />
				</button>
			</div>
			<div className='flex items-center justify-center space-x-2'>
				<label className='border rounded-lg w-full py-1 px-3 focus-within:border-edanra-green'>
					<span className='text-xs text-gray-400'>min price</span>
					<div className='flex items-center justify-center space-x-2'>
						<span>$</span>
						<input
							type='number'
							className='w-full text-base h-4 p-0 border-0 focus:ring-0 appearance-textField'
							defaultValue={rangeValues.price_min}
							ref={inputMinRef}
							onChange={changeLeftNumber}
							onBlur={checkMinNumber}
						/>
					</div>
				</label>
				<div className='w-4 h-[1.5px] bg-gray-400' />
				<label className='border rounded-lg w-full py-1 px-3 focus-within:border-edanra-green'>
					<span className='text-xs text-gray-400'>max price</span>
					<div className='flex items-center justify-center space-x-2 relative'>
						<span>$</span>
						<input
							type='number'
							className='w-full text-base h-4 p-0 border-0 focus:ring-0 appearance-textField'
							defaultValue={rangeValues.price_max}
							ref={inputMaxRef}
							onChange={changeRightNumber}
							onBlur={checkMaxNumber}
						/>
						{rangeValues.price_max === barMax ? (
							<div className='absolute left-[74px] text-xl'>
								+
							</div>
						) : (
							<div />
						)}
					</div>
				</label>
			</div>
		</div>
	);
};

export default PriceRange;
