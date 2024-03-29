import * as yup from 'yup';

export const SignUpSchema = yup.object({
	firstName: yup.string().required('Please enter your first name'),
	lastName: yup.string().required('Please enter your last name'),
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Please enter your email'),
	password: yup.string().required('Please enter your password'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match'),
});
