import React, { useState, useMemo, Dispatch, SetStateAction } from 'react';
import StarRatings from 'react-star-ratings';
import { UseMutationResult } from '@tanstack/react-query';

interface StarRatingProps {
	rating?: number;
	rating_count?: number;
	isEdit: boolean;
	remarkItem?: UseMutationResult<any, Error, any, unknown>;
	setShow?: Dispatch<SetStateAction<boolean>>;
	type?: string;
	id?: number;
	orderNumber?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
	rating,
	rating_count,
	isEdit,
	remarkItem,
	setShow,
	type,
	id,
	orderNumber,
}) => {
	const [currentRating, setCurrentRating] = useState(isEdit ? 0 : rating);

	const handleRatingChange = (newRating: number) => {
		setCurrentRating(newRating);
		if (remarkItem !== undefined) {
			remarkItem.mutate({
				orderNumber: orderNumber,
				itemType: type,
				itemID: id,
				rating: newRating,
			});
			if (setShow) {
				setShow(true);
			}
		}
	};

	return (
		<div style={{ marginTop: '10px' }}>
			<StarRatings
				rating={currentRating}
				starRatedColor='#ffb400'
				starEmptyColor='#cccccc'
				starDimension='12px'
				starSpacing='2px'
				numberOfStars={5}
				name='rating'
				changeRating={isEdit ? handleRatingChange : undefined} // Enable or disable rating change based on isEdit
			/>
			{isEdit ? (
				<span style={{ fontSize: '12px' }}>
					{' '}
					(Please rate the item){' '}
				</span>
			) : (
				<span style={{ fontSize: '12px' }}>
					({rating_count} {rating_count === 1 ? 'rating' : 'ratings'})
				</span>
			)}
		</div>
	);
};

export default StarRating;
