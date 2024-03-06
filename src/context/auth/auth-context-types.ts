import { UserType } from '@/types/auth/auth.types';
import { Dispatch, SetStateAction } from 'react';

export interface AuthContextType {
	currentUser: UserType | null;
	setCurrentUser: Dispatch<SetStateAction<UserType | null>>;
}
