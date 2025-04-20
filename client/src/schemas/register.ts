import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    user_type: z.enum(["admin", "student"]),
    address: z.string(),
    phoneNumber: z.string(),
    profile: z
      .any()
      .optional()
      .nullable()
      .superRefine((val, ctx) => {
        if (!val || (val instanceof FileList && val.length === 0)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Profile image is required",
          });
          return;
        }
        const file = val instanceof FileList ? val[0] : val;
        if (file && file.size > 5000000) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File size should be less than 5MB",
          });
        }
        if (
          file &&
          !["image/jpeg", "image/png", "image/jpg"].includes(file.type)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File type must be image/jpeg, image/png, or image/jpg",
          });
        }
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
export const otpSchema = z.object({
  otp: z.string().min(1, { message: "OTP is required" }),
});
export const verifyEmailSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
});

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["password2"],
      });
    }
  });

export const editUserSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  phoneNumber: z.string().min(1, { message: "Phone is required" }),
});

export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type TVerifyEmailSchema = z.infer<typeof verifyEmailSchema>;
export type TOtpType = z.infer<typeof otpSchema>;
export type TRegisterType = z.infer<typeof registerSchema>;
export type TEditUserSchema = z.infer<typeof editUserSchema>;
