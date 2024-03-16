import { UserType } from '@/types/auth/auth.types';
import Cookies from 'js-cookie';

const setUserCookies = (userData: UserType) => {
	const { token, userInfo } = userData;

	Cookies.set('token', token);
	Cookies.set('userInfo', JSON.stringify(userInfo));
};
