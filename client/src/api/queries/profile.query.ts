import { api } from '../api';
import { useQuery } from '@tanstack/react-query';
import { toastTrigger } from '../../lib/utils';

export const useFetchStudentProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await api.get('/auth/me/');
            return response.data;
        },
        onError: () => {
            toastTrigger('Failed to fetch profile', undefined, 'error');
        },
    });
};