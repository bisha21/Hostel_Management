import {z} from 'zod'

export const loginSchema = z.object({
    email:z.string().min(1 ,{message:"Email is required"}),
    password: z.string().min(1 ,{message:"Password is required"})
})

export type TLoginType = z.infer<typeof loginSchema>