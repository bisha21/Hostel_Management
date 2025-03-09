import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { toastTrigger } from "../../lib/utils";
import { MealItem } from "../../types/response.types";

export const useCreateMealMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (mealData: Omit<MealItem, "id" | "createdAt" | "updatedAt">) =>
            api.post("/dining/meals/", mealData),
        onSuccess: () => {
            toastTrigger("Meal created successfully", undefined, "success");
            queryClient.invalidateQueries({ queryKey: ["weeklySchedule"] });
        },
        onError: () => {
            toastTrigger("Failed to create meal", undefined, "error");
        },
    });
};

export const useUpdateMealMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ day, mealType, mealData }: { day: string; mealType: string; mealData: Partial<MealItem> }) =>
            api.put(`/dining/meals/${day}/${mealType}`, mealData),
        onSuccess: () => {
            toastTrigger("Meal updated successfully", undefined, "success");
            queryClient.invalidateQueries({ queryKey: ["weeklySchedule"] });

        },
        onError: () => {
            toastTrigger("Failed to update meal", undefined, "error");
        },
    });
};

export const useDeleteMealMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ day, mealType }: { day: string; mealType: string }) =>
            api.delete(`/dining/meals/${day}/${mealType}`),
        onSuccess: () => {
            toastTrigger("Meal deleted successfully", undefined, "success");
            queryClient.invalidateQueries({ queryKey: ["weeklySchedule"] });
        },
        onError: () => {
            toastTrigger("Failed to delete meal", undefined, "error");
        },
    });
};
