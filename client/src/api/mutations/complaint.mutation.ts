import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastTrigger } from "../../lib/utils";
import { api } from "../api";
import { ComplaintFormValues } from "../../schemas/complaint";

export const useComplaintMutation = ({initiatorName}:{initiatorName:string}) => {
    const queryClient = useQueryClient();
    const complaintMutation = useMutation({
        mutationFn: (data:ComplaintFormValues) => api.post(`/complaint/${initiatorName}`, data),
        onSuccess: () => {
            toastTrigger('Complaint submitted successfully',undefined,'success');
            queryClient.invalidateQueries({queryKey:['room']})
        },
        onError: () => {
            toastTrigger('Complaint submission failed',undefined,'error');
        }
    }
    )
    return complaintMutation
}