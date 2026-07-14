import { z } from "zod";

export const bookingStatusEnum = z.enum(["pending", "confirmed", "cancelled"]);

export const createBookingSchema = z.object({
  startDate: z.coerce.date().optional(),
});
export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export const updateBookingSchema = z.object({
  status: bookingStatusEnum,
});
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
