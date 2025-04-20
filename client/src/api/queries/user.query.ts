import { api } from "../api";
import { useQuery } from "@tanstack/react-query";
import { toastTrigger } from "../../lib/utils";

export const useFetchUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/auth/detail");
      return response.data;
    },
    onError: () => {
      toastTrigger("Failed to fetch students", undefined, "error");
    },
  });
};
