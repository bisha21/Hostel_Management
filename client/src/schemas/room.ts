import { z } from "zod";

export const roomValidationSchema = z.object({
  id: z.number().int().positive().optional(), 
  RoomNumber: z.string().max(10, "RoomNumber must not exceed 10 characters"),
  Capacity: z.coerce.number().int().positive("Capacity must be a positive integer"),
  Status: z.enum(["Available", "Occupied"]).optional(),
  Type: z.enum(["Single", "Double", "Triple"]),
  Price: z.coerce.number().int().positive("Price must be a positive integer"),
  Description: z.string().max(100, "Description must not exceed 100 characters").optional(),
  FloorNumber: z.number().int().positive("FloorNumber must be a positive integer"),
});

export type TRoomValidationType = z.infer<typeof roomValidationSchema>;