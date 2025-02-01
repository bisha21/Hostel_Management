import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { toastTrigger } from "../../lib/utils";

export const useFetchBookings = () => {
  return useQuery({
    queryKey: ['bookings', 'all'],
    queryFn: async () => {
      const response = await api.get('/booking/all');
      return response.data;
    },
    onError: () => {
      toastTrigger('Failed to fetch rooms', undefined, 'error');
    },
  });
};