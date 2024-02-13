import * as yup from 'yup';

export const SignUpSchema = yup.object({
	name: yup.string().required('Please enter your name'),
	userType: yup
		.string()
		.oneOf(['user', 'agent'])
		.required('Please select a user type'),
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Please enter your email'),
	password: yup.string().required('Please enter your password'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match'),
});
