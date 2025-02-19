import { api } from "../api";
import {  useMutation } from '@tanstack/react-query'
import { toastTrigger } from "../../lib/utils";
import { TNotificationSchema } from "../../schemas/notification";

export const useSingleNotificationMutation = () => {
    const sendNotificationMutation = useMutation({
        mutationFn: (data: TNotificationSchema) => api.post('/sendnotification/', data),
        onSuccess: () => {
            toastTrigger('Notification sent successfully',undefined,'success');
        },
        onError: () => {
            toastTrigger('Unable to send notification.',undefined,'error');
        }
    }
    )
    return sendNotificationMutation
}


export const useAllNotificationMutation = () => {
    const sendNotificationMutation = useMutation({
        mutationFn: (data: TNotificationSchema) => api.post('/sendnotification/all', data),
        onSuccess: () => {
            toastTrigger('Notification sent successfully',undefined,'success');
        },
        onError: () => {
            toastTrigger('Unable to send notification.',undefined,'error');
        }
    }
    )
    return sendNotificationMutation
}
