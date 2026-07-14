import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("id must be a positive integer"),
});
export type IdParam = z.infer<typeof idParamSchema>;

export const roomIdParamSchema = z.object({
  roomId: z.coerce.number().int().positive("roomId must be a positive integer"),
});
export type RoomIdParam = z.infer<typeof roomIdParamSchema>;

export const complaintIdParamSchema = z.object({
  complaintId: z.coerce.number().int().positive("complaintId must be a positive integer"),
});
export type ComplaintIdParam = z.infer<typeof complaintIdParamSchema>;

export const bookingIdParamSchema = z.object({
  id: z.coerce.number().int().positive("id must be a positive integer"),
});
export type BookingIdParam = z.infer<typeof bookingIdParamSchema>;

export const paymentBookingIdParamSchema = z.object({
  bookingId: z.coerce.number().int().positive("bookingId must be a positive integer"),
});
export type PaymentBookingIdParam = z.infer<typeof paymentBookingIdParamSchema>;

/** Loose passthrough for the generic getAll() filter query (handleFactoryController). */
export const genericFilterQuerySchema = z.record(z.string(), z.string());
export type GenericFilterQuery = z.infer<typeof genericFilterQuerySchema>;
