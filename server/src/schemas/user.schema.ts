import { z } from "zod";

export const updateProfileSchema = z
  .object({
    username: z.string().min(1).optional(),
    email: z.email().optional(),
    address: z.string().min(1).optional(),
    phone_number: z.string().min(1).optional(),
    profile_picture: z.string().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Please provide a field to update",
  });
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
