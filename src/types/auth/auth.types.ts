export interface SignUpProps {
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

export interface SignInProps {
	email: string;
	password: string;
}
