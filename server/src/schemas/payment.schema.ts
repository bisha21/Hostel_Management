import { z } from "zod";

export const paymentGatewayEnum = z.enum(["khalti", "cash"]);
export const paymentStatusEnum = z.enum(["success", "pending", "failed"]);

export const cashPaymentSchema = z.object({
  purpose: z.string().min(1).optional(),
  transactionId: z.string().min(1, "Transaction ID is required"),
  amount: z.coerce.number().positive().optional(),
  roomName: z.string().min(1, "roomName is required"),
});
export type CashPaymentInput = z.infer<typeof cashPaymentSchema>;

export const khaltiCompleteQuerySchema = z.object({
  token: z.string().optional(),
  amount: z.string().optional(),
  transaction_id: z.string().optional(),
  pidx: z.string().min(1, "Missing pidx in request"),
});
export type KhaltiCompleteQuery = z.infer<typeof khaltiCompleteQuerySchema>;
