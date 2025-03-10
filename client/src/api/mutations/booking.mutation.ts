import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastTrigger } from "../../lib/utils";
import { api } from "../api";
import { TBookingValidationType } from "../../schemas/booking";

export const useEditBookMutation = ({initiatorName}:{initiatorName:string}) => {
    const queryClient = useQueryClient();
    const editBookingMutation = useMutation({
        mutationFn: (data:TBookingValidationType) => api.patch(`/booking/${initiatorName}`, data),
        onSuccess: () => {
            toastTrigger('Booking edited successfully',undefined,'success');
            queryClient.invalidateQueries({queryKey:['room']})
        },
        onError: () => {
            toastTrigger('Booking edit failed',undefined,'error');
        }
    }
    )
    return editBookingMutation
}