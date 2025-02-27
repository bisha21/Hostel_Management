import { useMutation } from "@tanstack/react-query";
import { toastTrigger } from "../../lib/utils";
import { api } from "../api";
import { TBookingValidationType } from "../../schemas/booking";

export const useEditBookMutation = ({initiatorName}:{initiatorName:string}) => {

    const editBookingMutation = useMutation({
        mutationFn: (data:TBookingValidationType) => api.patch(`/booking/${initiatorName}`, data),
        onSuccess: () => {
            toastTrigger('Booking edited successfully',undefined,'success');
        },
        onError: (data) => {
            console.log(data);
            toastTrigger('Room edit failed',undefined,'error');
        }
    }
    )
    return editBookingMutation
}