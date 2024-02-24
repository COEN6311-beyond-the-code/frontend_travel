export interface SignUpProps {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

export interface SignInProps {
	email: string;
	password: string;
}

export interface ProfileType {
	firstName: string;
	lastName: string;
	mobile?: string;
}
