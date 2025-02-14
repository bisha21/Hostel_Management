import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { toastTrigger } from "../../lib/utils";

export const useFetchAttendanceDetail = () => {
    return useQuery({
        queryKey: ['attendance'],
        queryFn: async () => {
            const response = await api.get('/attendance/me');
            return response.data;
        },
        onError: () => {
            toastTrigger('Failed to fetch attendance details', undefined, 'error');
        },
    });
};

export const useFetchAllAttendances = (date:string) => {
    return useQuery({
        queryKey: ['attendances',date],
        queryFn: async () => {
            const response = await api.get(`/attendance?date=${date}`);
            return response.data;
        },
        onError: () => {
            toastTrigger('Failed to fetch attendance details', undefined, 'error');
        },
    });
};
