import * as z from "zod";

export const transactionFormSchema = z.object({
  receiverName: z.string().min(1, "Receiver name is required"),
  receiverBank: z.string().min(1, "Receiver bank is required"),
  receiverAccount: z.string().min(1, "Receiver account is required"),
  receiverPhone: z.string().min(6, "Invalid phone number"),
  receiverEmail: z.string().email("Please enter a valid email address"),
  receiverQr: z.string().optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(["pending", "received", "processing", "completed", "cancelled"])
});