import { api } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastTrigger } from '../../lib/utils';
import { TRoomValidationType } from '../../schemas/room';

export const useAddRoomMutation = () => {
  const queryClient = useQueryClient();
  const addRoomMutation = useMutation({
    mutationFn: (data: TRoomValidationType) => api.post('/room/', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room'] });
      toastTrigger('Room added successfully', undefined, 'success');
    },
    onError: () => {
      toastTrigger('Room add failed', undefined, 'error');
    },
  });
  return addRoomMutation;
};

export const useEditRoomMutation = ({
  initiatorName,
}: {
  initiatorName: string;
}) => {
  const queryClient = useQueryClient();
  const editCategoryMutation = useMutation({
    mutationFn: (data: TRoomValidationType) =>
      api.patch(`/room/${initiatorName}`, data),
    onSuccess: () => {
      toastTrigger('Room edited successfully', undefined, 'success');
      queryClient.invalidateQueries({ queryKey: ['room'] });
    },
    onError: (data) => {
      console.log(data);
      toastTrigger('Room edit failed', undefined, 'error');
    },
  });
  return editCategoryMutation;
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (roomId: string) => {
      const { data } = await api.get(`/room/${roomId}/booking`);
      return data.data; // Booking data returned
    },
    onSuccess: () => {
      toastTrigger('Booking created successfully', undefined, 'success');
      queryClient.invalidateQueries({ queryKey: ['room'] });
      // try {
      //   const { data } = await axios.post(
      //     `http://localhost:3000/api/payment/${booking.id}`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${authToken}`,
      //       },
      //     }
      //   );

      //   if (data.payment_url) {
      //     window.location.href = data.payment_url; // Redirect to Khalti
      //   } else {
      //     console.log('Response Data:', data);
      //     toastTrigger('Failed to retrieve payment URL', undefined, 'error');
      //   }
      // } catch (err:any) {
      //   console.error('Payment Error:', err.response?.data);
      //   toastTrigger(
      //     err.response?.data?.message || 'Error initiating payment',
      //     undefined,
      //     'error'
      //   );
      // }
    },

    onError: (err:any) => {
      toastTrigger((err?.response?.data?.message || "Failed to create booking"), undefined, 'error');
    },
  });
};
