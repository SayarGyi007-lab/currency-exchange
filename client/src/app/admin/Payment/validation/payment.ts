import * as z from "zod";

export const createPaymentMethodSchema = z.object({
  currencyId: z.string().min(1, "Currency is required"),

  accountName: z.string().min(1, "Account name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  bankProvider: z.string().min(1, "Bank provider is required"),

  qrImage: z.string().min(1, "QR image is required"),
});

export const updatePaymentMethodSchema = z.object({
  currencyId: z.string(),

  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  bankProvider: z.string().optional(),

  qrImage: z.string().optional(),
});