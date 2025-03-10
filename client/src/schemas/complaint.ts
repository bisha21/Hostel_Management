import  {z} from 'zod';

export const complaintSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["Maintenance", "Housekeeping"], {
    required_error: "Please select a category",
  }),
  feedback: z.string().min(5, "Feedback must be at least 5 characters"),
});

export type ComplaintFormValues = z.infer<typeof complaintSchema>;