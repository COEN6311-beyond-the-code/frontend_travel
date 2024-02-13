export interface SignUpProps {
	name: string;
	userType: 'user' | 'agent';
	email: string;
	password: string;
	confirmPassword?: string;
}

export interface SignInProps {
	email: string;
	password: string;
}
