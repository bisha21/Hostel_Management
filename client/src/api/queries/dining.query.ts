import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { toastTrigger } from "../../lib/utils";
import { MealItem, WeeklySchedule } from "../../types/response.types";

export const useFetchAllMeals = () => {
  return useQuery({
    queryKey: ["meals"],
    queryFn: async (): Promise<MealItem[]> => {
      const response = await api.get("/dining/meals");
      return response.data;
    },
    onError: () => {
      toastTrigger("Failed to fetch meals", undefined, "error");
    },
  });
};

export const useFetchMealsByDay = (day: string) => {
  return useQuery({
    queryKey: ["meals", day],
    queryFn: async (): Promise<MealItem[]> => {
      const response = await api.get(`/dining/meals/${day}`);
      return response.data;
    },
    onError: () => {
      toastTrigger(`Failed to fetch meals for ${day}`, undefined, "error");
    },
  });
};

export const useFetchWeeklySchedule = () => {
  return useQuery({
    queryKey: ["weeklySchedule"],
    queryFn: async (): Promise<WeeklySchedule> => {
      const response = await api.get("/dining/meals/weekly-schedule");
      return response.data.data as WeeklySchedule;
    },
    onError: () => {
      toastTrigger("Failed to fetch weekly schedule", undefined, "error");
    },
  });
};
