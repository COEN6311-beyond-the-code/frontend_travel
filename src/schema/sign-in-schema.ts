import * as yup from 'yup';

export const SignInSchema = yup.object({
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Please enter your email'),
	password: yup
		.string()
		.required('Please enter your password')
		.min(6, 'Password must be at least 5 characters'),
});
