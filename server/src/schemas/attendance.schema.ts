import { z } from "zod";

export const attendanceStatusEnum = z.enum(["present", "absent"]);

export const createAttendanceSchema = z.object({
  status: attendanceStatusEnum,
});
export type CreateAttendanceInput = z.infer<typeof createAttendanceSchema>;

export const updateApprovalStatusSchema = z.object({
  userId: z.coerce.number().int().positive(),
  date: z.string().min(1, "date is required"),
  is_approved: z.boolean(),
});
export type UpdateApprovalStatusInput = z.infer<typeof updateApprovalStatusSchema>;

export const attendanceQuerySchema = z.object({
  date: z.string().optional(),
});
export type AttendanceQuery = z.infer<typeof attendanceQuerySchema>;
