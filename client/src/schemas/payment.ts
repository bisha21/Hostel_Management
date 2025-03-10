import { z } from 'zod';

export const paymnetSchema = z.object({
  purpose: z.string().min(1, 'Message is required'),
  transactionId: z.string().optional(),
  amount: z.number().min(1, 'Amount is required').optional(),
  roomName: z.string()
});

export type TPaymentSchema = z.infer<typeof paymnetSchema>;
