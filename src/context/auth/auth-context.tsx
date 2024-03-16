import { useEffect, useState, createContext, FC, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { AuthContextType } from '@/context/auth/auth-context-types';
import { UserType } from '@/types/auth/auth.types';

export const AuthContext = createContext<AuthContextType>({
	currentUser: null,
	setCurrentUser: () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<UserType | null>(null);

	useEffect(() => {
		const token = Cookies.get('token');
		const userInfo = Cookies.get('userInfo');

		if (token && userInfo) {
			setCurrentUser({ token, userInfo: JSON.parse(userInfo) });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
