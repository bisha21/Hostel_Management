import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastTrigger } from '../../lib/utils';
import { api } from '../api';

export const usePaymentMutation = ({ bookingId }: { bookingId: string }) => {
  const sendPaymentMutation = useMutation({
    mutationFn: (data) => api.post(`/payment/${bookingId}`, data),
    onSuccess: (data) => {
      toastTrigger('Payment sent successfully', undefined, 'success');
      if (data.data.payment_url) {
        window.location.href = data.data.payment_url;
      }
    },
    onError: () => {
      toastTrigger('Unable to send payment.', undefined, 'error');
    },
  });
  return sendPaymentMutation;
};
export const useCashPaymentMutation = () => {
  const queryClient = useQueryClient();
  const cashPayment = useMutation({
    mutationFn: (data) => api.post(`/payment`, data),
    onSuccess: () => {
      toastTrigger('Payment sent successfully', undefined, 'success');
      queryClient.invalidateQueries(['payments']);
    },
    onError: () => {
      toastTrigger('Unable to send payment.', undefined, 'error');
    },
  });

  return cashPayment;
};
