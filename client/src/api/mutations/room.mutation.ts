import { api } from "../api";
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { toastTrigger } from "../../lib/utils";
import { TRoomValidationType } from "../../schemas/room";

export const useAddRoomMutation = () => {
    const queryClient = useQueryClient();
    const addRoomMutation = useMutation({
        mutationFn: (data:TRoomValidationType) => api.post('/room/', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['room']});
            toastTrigger('Room added successfully',undefined,'success');
        },
        onError: () => {
            toastTrigger('Room add failed',undefined,'error');
        }
    }
    )
    return addRoomMutation
}

export const useEditRoomMutation = ({initiatorName}:{initiatorName:string}) => {

    const editCategoryMutation = useMutation({
        mutationFn: (data:TRoomValidationType) => api.patch(`/room/${initiatorName}`, data),
        onSuccess: () => {
            toastTrigger('Room edited successfully',undefined,'success');
        },
        onError: (data) => {
            console.log(data);
            toastTrigger('Room edit failed',undefined,'error');
        }
    }
    )
    return editCategoryMutation
}