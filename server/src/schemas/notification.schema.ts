import { z } from "zod";

export const notificationTypeEnum = z.enum(["Informational", "Alert", "Promotional"]);
export const notificationPriorityEnum = z.enum(["HighPriority", "LowPriority"]);

export const createNotificationSchema = z.object({
  message: z.string().min(1, "message is required"),
  type: notificationTypeEnum,
  priority: notificationPriorityEnum,
  sentby: z.string().optional(),
  email: z.email("Invalid email"),
});
export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;

export const createNotificationForAllSchema = z.object({
  message: z.string().min(1, "message is required"),
  type: notificationTypeEnum,
  priority: notificationPriorityEnum,
  sentby: z.string().optional(),
});
export type CreateNotificationForAllInput = z.infer<typeof createNotificationForAllSchema>;
