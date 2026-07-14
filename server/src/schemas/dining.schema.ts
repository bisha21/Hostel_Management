import { z } from "zod";

export const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;
export const mealTypes = ["breakfast", "lunch", "snacks", "dinner"] as const;

const dayField = z
  .string()
  .min(1, "day is required")
  .transform((v) => v.toLowerCase())
  .pipe(z.enum(daysOfWeek));

const mealTypeField = z
  .string()
  .min(1, "mealType is required")
  .transform((v) => v.toLowerCase())
  .pipe(z.enum(mealTypes));

export const dayParamSchema = z.object({ day: dayField });
export type DayParam = z.infer<typeof dayParamSchema>;

export const dayMealTypeParamSchema = z.object({ day: dayField, mealType: mealTypeField });
export type DayMealTypeParam = z.infer<typeof dayMealTypeParamSchema>;

export const createMealSchema = z.object({
  day: dayField,
  mealType: mealTypeField,
  items: z.array(z.string().min(1)).min(1, "items are required"),
  startTime: z.string().min(1, "startTime is required"),
  endTime: z.string().min(1, "endTime is required"),
});
export type CreateMealInput = z.infer<typeof createMealSchema>;

export const updateMealSchema = z.object({
  items: z.array(z.string().min(1)).min(1).optional(),
  startTime: z.string().min(1).optional(),
  endTime: z.string().min(1).optional(),
});
export type UpdateMealInput = z.infer<typeof updateMealSchema>;
