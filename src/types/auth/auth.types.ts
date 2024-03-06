export interface SignUpProps {
	firstName: string;
	lastName: string;
	email: string;
	mobile: string;
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

export interface UserType {
	userInfo: {
		id: number;
		isAgent: boolean;
		firstName: string;
		lastName: string;
		email: string;
		mobile: string;
	};
	token: string;
}
