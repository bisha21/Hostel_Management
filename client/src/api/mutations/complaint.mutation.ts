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

export const useUpdateComplaintStatusMutation = ({initiatorName}:{initiatorName:string}) => {
    const queryClient = useQueryClient();
    const updateComplaintStatusMutation = useMutation({
        mutationFn: (data:{status:"Completed" | "Pending"}) => api.patch(`/complaint/status/${initiatorName}`, data),
        onSuccess: () => {
            toastTrigger('Complaint status updated successfully',undefined,'success');
            queryClient.invalidateQueries({queryKey:['complaints']})
        },
        onError: () => {
            toastTrigger('Complaint status update failed',undefined,'error');
        }
    }
    )
    return updateComplaintStatusMutation
}