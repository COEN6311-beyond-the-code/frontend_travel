import * as yup from 'yup';

export const ProfileSchema = yup.object({
	firstName: yup.string().required('Please enter your first name'),
	lastName: yup.string().required('Please enter your last name'),
	mobile: yup.string().max(10, 'Please enter a valid mobile number'),
});

export const AccountSchema = yup.object({
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Please enter your email'),
	password: yup.string().required('Please enter your password'),
});

export const DeactivateAccountSchema = yup.object({
	password: yup.string().required('Please enter your password'),
});
