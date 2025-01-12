import {z} from 'zod'

export const registerSchema = z.object({
    username:z.string().min(1 ,{message:"Username is required"}),
    password: z.string().min(8 ,{message:"Password must contain at least 8 characters"}),
    confirmPassword: z.string().min(1 ,{message:"Confirm Password is required"}),
    email: z.string().email().min(1 ,{message:"Email is required"}),
    user_type: z.enum(['admin', 'student']),
    address: z.string().min(1 ,{message:"Address is required"}),
    phone_number: z.coerce.number().min(1 ,{message:"Phone number is required"}),
    profile_picture: z.string().nullable(),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match',
            path: ['password2'],
        })
    }
})

export type TRegisterType = z.infer<typeof registerSchema>