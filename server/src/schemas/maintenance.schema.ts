import { z } from "zod";

export const maintenanceStatusEnum = z.enum(["Pending", "Completed", "Cancelled"]);

export const createMaintenanceSchema = z.object({
  RoomId: z.coerce.number().int().positive(),
  description: z.string().min(1, "description is required"),
  maintenance_type: z.string().min(1, "maintenance_type is required"),
  status: maintenanceStatusEnum.optional(),
});
export type CreateMaintenanceInput = z.infer<typeof createMaintenanceSchema>;

export const updateMaintenanceSchema = createMaintenanceSchema.partial();
export type UpdateMaintenanceInput = z.infer<typeof updateMaintenanceSchema>;
