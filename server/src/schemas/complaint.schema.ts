import { z } from "zod";

export const complaintCategoryEnum = z.enum(["Maintenance", "Housekeeping", "Room Change"]);
export const complaintStatusEnum = z.enum(["Pending", "Completed"]);

export const createComplaintSchema = z.object({
  description: z.string().min(1, "Description is required"),
  category: complaintCategoryEnum,
  feedback: z.string().min(1, "Feedback is required"),
});
export type CreateComplaintInput = z.infer<typeof createComplaintSchema>;

export const updateComplaintSchema = z.object({
  status: complaintStatusEnum,
});
export type UpdateComplaintInput = z.infer<typeof updateComplaintSchema>;
