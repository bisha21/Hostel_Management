import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { toastTrigger } from "../../lib/utils";

export const useFetchComplaints = () => {
  return useQuery({
    queryKey: ['complaints'],
    queryFn: async () => {
      const response = await api.get('/complaint/');
      return response.data;
    },
    onError: () => {
      toastTrigger('Failed to fetch complaints', undefined, 'error');
    },
  });
};