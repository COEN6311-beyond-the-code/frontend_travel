import * as yup from 'yup';

export const ItemSchema = yup.object({
	name: yup.string().required('Please the item name'),
	description: yup.string().required('Please enter a description'),
	price: yup.number().required('Please enter a price'),
	imageSrc: yup.mixed().required('Please upload an image'),
	imageAlt: yup.string().required('Please enter an image alt'),
	type: yup
		.string()
		.oneOf(['flight', 'hotel', 'activity'])
		.required('Please select an item type'),
});
