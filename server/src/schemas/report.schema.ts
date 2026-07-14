import { z } from "zod";

export const reportStatusEnum = z.enum(["submitted", "processing"]);

export const createReportSchema = z.object({
  report_name: z.string().min(1, "report_name is required"),
  type: z.string().min(1, "type is required"),
  date: z.coerce.date().optional(),
  report_status: reportStatusEnum.optional(),
  generated_details: z.string().min(1, "generated_details is required"),
});
export type CreateReportInput = z.infer<typeof createReportSchema>;
