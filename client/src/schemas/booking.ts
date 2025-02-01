import  {z} from 'zod' 
export const bookingSchema=  z.object({
    status: z.enum(['pending','confirmed','cancelled']),
})
export type TBookingValidationType = z.infer<typeof bookingSchema>;