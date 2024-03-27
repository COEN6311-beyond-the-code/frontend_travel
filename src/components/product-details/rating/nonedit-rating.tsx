import React, { useState, useMemo } from 'react';
import StarRatings from 'react-star-ratings';
import useProduct from '@/hooks/product/useProduct';
import { UseMutationResult } from '@tanstack/react-query';
import Message from '@/components/message/message';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import FaceFrownIcon from '@heroicons/react/16/solid/FaceFrownIcon';
import CodeBracketIcon from '@heroicons/react/16/solid/CodeBracketIcon';

interface StarRatingProps {
	rating: number;
	rating_count: number;
	isEdit: boolean;
	remarkItem?: UseMutationResult<any, Error, any, unknown>;
}

const StarRating: React.FC<StarRatingProps> = ({
	rating,
	rating_count,
	isEdit,
	remarkItem,
}) => {
	const [currentRating, setCurrentRating] = useState(isEdit ? 0 : rating);
	const [show, setShow] = useState(false);

	const handleRatingChange = (newRating: number) => {
		setCurrentRating(newRating);
		if (remarkItem !== undefined) {
			remarkItem.mutate({
				orderNumber: '123',
				itemType: 'activity',
				itemID: 10,
				rating: newRating,
			});
		}
		setShow(true);
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
			{!isEdit && (
				<span style={{ fontSize: '12px' }}>
					({rating_count} ratings)
				</span>
			)}
			<Message
				title='Submission completed.'
				subtitle='You have submitted a rating for this product.'
				iconColor='text-red-500'
				show={show}
				setShow={setShow}
			/>
		</div>
	);
};

export default StarRating;
