import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { toastTrigger } from "../../lib/utils";

export const useFetchNotification = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await api.get('/sendnotification/');
      return response.data;
    },
    onError: () => {
      toastTrigger('Failed to fetch notification history.', undefined, 'error');
    },
  });
};