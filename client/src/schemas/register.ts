import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
    email: z.string().email().min(1, { message: 'Email is required' }),
    user_type: z.enum(['admin', 'student']),
    address: z.string(),
    phoneNumber: z.string(),
    profile: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['password2'],
      });
    }
  });

export const otpSchema = z.object({
  otp: z.string().min(1, { message: 'OTP is required' }),
});
export const verifyEmailSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
})

export const changePasswordSchema = z.object({
  password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Confirm Password is required' }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match',
      path: ['password2'],
    });
  }
});

export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>
export type TVerifyEmailSchema = z.infer<typeof verifyEmailSchema>
export type TOtpType = z.infer<typeof otpSchema>;
export type TRegisterType = z.infer<typeof registerSchema>;
