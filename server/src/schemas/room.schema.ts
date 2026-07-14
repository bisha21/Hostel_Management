import { z } from "zod";

export const roomTypeEnum = z.enum(["Single", "Double", "Triple"]);
// NOTE: "Maintenance" is accepted here to match the original createRoom validation,
// even though the Sequelize model's Status ENUM only defines Available/Occupied.
export const roomStatusEnum = z.enum(["Available", "Occupied", "Maintenance"]);

export const createRoomSchema = z.object({
  RoomNumber: z.string().min(1, "RoomNumber is required"),
  Capacity: z.coerce.number().int().positive("Capacity must be greater than zero"),
  Status: roomStatusEnum,
  Type: roomTypeEnum,
  Description: z.string().max(100).optional(),
  Price: z.coerce.number().int().positive("Price must be a positive integer"),
  FloorNumber: z.coerce.number().int(),
});
export type CreateRoomInput = z.infer<typeof createRoomSchema>;

export const updateRoomSchema = createRoomSchema.partial();
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
