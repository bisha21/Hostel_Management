import { z } from "zod";

export const notificationSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  type: z.enum(['Informational', 'Alert', 'Promotional']),
  priority: z.enum(['HighPriority', 'LowPriority']),
  sentby: z.string().min(1, 'Sender name is required'),
  email: z.string().email().min(1, 'Email is required'),
  userId: z.string().optional()
});

export type TNotificationSchema = z.infer<typeof notificationSchema>;