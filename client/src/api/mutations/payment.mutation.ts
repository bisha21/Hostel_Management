import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastTrigger } from '../../lib/utils';
import { api } from '../api';
import { useNavigate, useSearchParams } from 'react-router';

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


export const useCompletePaymentMutation = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
  
    const completePaymentMutation = useMutation({
      mutationFn: async () => {
        const pidx = searchParams.get("pidx");
        const token = searchParams.get("token");
        const amount = searchParams.get("amount");
  
        if (!pidx || !token || !amount) {
          throw new Error("Missing payment parameters.");
        }
  
        return api.get(`/payment/complete-payment`, {
          params: { pidx, token, amount },
        });
      },
      onSuccess: (data) => {
        toastTrigger("Payment Verified Successfully!", undefined, "success");
        console.log("✅ Payment Verified:", data);
  
        // ✅ Redirect user after successful payment verification
        navigate("/student");
      },
      onError: (error) => {
        toastTrigger("Payment verification failed.", undefined, "error");
        console.error("❌ Payment verification failed:", error);
      },
    });
  
    return completePaymentMutation;
  };
