import * as yup from 'yup';

const shared = {
	name: yup.string().required('Please the item name'),
	description: yup.string().required('Please enter a description'),
	price: yup.number().required('Please enter a price'),
	imageSrc: yup.mixed().required('Please upload an image'),
	imageAlt: yup.string().required('Please enter an image alt'),
	type: yup
		.string()
		.oneOf(['package', 'flight', 'hotel', 'activity'])
		.required('Please select an item type'),
	features: yup
		.string()
		.required('Please enter the item features seperated by semicolons'),
};

export const ItemSchema = yup.object(shared);

export const PackageSchema = yup.object({
	...shared,
	flight: yup.string().required('Please select a flight'),
	hotel: yup.string().required('Please select a hotel'),
	activity: yup.string().required('Please select an activity'),
});
