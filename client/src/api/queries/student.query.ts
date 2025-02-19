import { api } from '../api';
import { useQuery } from '@tanstack/react-query';
import { toastTrigger } from '../../lib/utils';

export const useFetchStudents = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const response = await api.get('/students/');
            return response.data;
        },
        onError: () => {
            toastTrigger('Failed to fetch students', undefined, 'error');
        },
    });
};