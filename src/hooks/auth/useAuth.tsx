import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	deactivateAccountQuery,
	getProfileQuery,
	loginQuery,
	logoutQuery,
	registerQuery,
	updateAccountQuery,
	updateProfileQuery,
} from '@/queries/auth/auth-queries';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth/auth-context';

const useAuth = () => {
	const queryClient = useQueryClient();
	const { currentUser } = useContext(AuthContext);

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

	const getUserProfile = useQuery({
		queryFn: getProfileQuery,
		queryKey: ['getUserProfile'],
		enabled: !!currentUser,
	});

	const updateProfile = useMutation({
		mutationFn: updateProfileQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getUserProfile'],
			});
		},
	});

	const updateAccount = useMutation({
		mutationFn: updateAccountQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getUserProfile'],
			});
		},
	});

	const deactivateAccount = useMutation({
		mutationFn: deactivateAccountQuery,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getUserProfile'],
			});
		},
	});

	return {
		register,
		login,
		logout,
		getUserProfile,
		updateProfile,
		updateAccount,
		deactivateAccount,
	};
};

export default useAuth;
