import { api } from '../api';
import { useQuery } from '@tanstack/react-query';
import { toastTrigger } from '../../lib/utils';

export const useFetchRooms = () => {
  return useQuery({
    queryKey: ['room'],
    queryFn: async () => {
      const response = await api.get('/room/');
      return response.data;
    },
    onError: () => {
      toastTrigger('Failed to fetch rooms', undefined, 'error');
    },
  });
};

export const useFetchSingleRoom = (initiatorName: string) => {
  return useQuery({
    queryKey: ['room', initiatorName],
    queryFn: async () => {
      const response = await api.get(`/room/${initiatorName}`);
      return response.data;
    },
    onError: () => {
      toastTrigger('Failed to fetch room', undefined, 'error');
    },
  });
};
export const useBooking = (roomId: number) => {
  return useQuery({
    queryKey: ['booking', roomId],
    queryFn: async () => {
      const response = await api.get(`/room/${roomId}/booking`);
      return response.data.data;
    },
    onSuccess: () => {
      toastTrigger('Booking created successfully', undefined, 'success');
    },
    onError: () => {
      toastTrigger('Failed to create booking', undefined, 'error');
    },
  });
};
