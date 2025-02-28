import { useMutation } from "@tanstack/react-query";
import { toastTrigger } from "../../lib/utils";
import { api } from "../api";

export const useComplaintsMutation = () => {

    const complaintsMutation = useMutation({
        mutationFn: (data) => api.post(`/complaint/`, data),
        onSuccess: () => {
            toastTrigger('Complaint submitted successfully',undefined,'success');
        },

        onError: (data) => {
            console.log(data);
            toastTrigger('Complaint Submission Failed',undefined,'error');
        }
    }
    )
    return complaintsMutation
}