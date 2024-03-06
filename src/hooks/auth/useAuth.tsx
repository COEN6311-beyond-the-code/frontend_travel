import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	loginQuery,
	logoutQuery,
	registerQuery,
} from '@/queries/auth/auth-queries';

const useAuth = () => {
	const queryClient = useQueryClient();

	const register = useMutation({
		mutationFn: registerQuery,
		onSuccess: () => {
			console.log('Registered successfully');
		},
	});

	const login = useMutation({
		mutationFn: loginQuery,
		onSuccess: () => {
			console.log('Logged in successfully');
		},
	});

	const logout = useMutation({
		mutationFn: logoutQuery,
		onSuccess: () => {
			console.log('Logged out successfully');
		},
	});

	return {
		register,
		login,
		logout,
	};
};

export default useAuth;
