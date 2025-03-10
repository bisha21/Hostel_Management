import { api } from '../api';
import { useQuery } from '@tanstack/react-query';
import { toastTrigger } from '../../lib/utils';

export const useFetchPayments = () => {
    return useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const response = await api.get('/payment');
            return response.data;
        },
        onError: () => {
            toastTrigger('Failed to fetch students', undefined, 'error');
        },
    });
};