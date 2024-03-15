import * as yup from 'yup';

export const CheckoutSchema = yup.object({
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Please enter your email'),
	phone: yup
		.string()
		.required('Please enter your phone number')
		.min(10, 'Password must be at least 10 characters'),
	departureDate: yup.string().required('Please enter your departure date'),
	endDate: yup.string().required('Please enter your end date'),
});
