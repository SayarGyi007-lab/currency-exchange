import { z } from "zod";

export const conversionSchema = z.object({
  fromCurrency: z.string().min(1),
  toCurrency: z.string().min(1),
  amount: z.number().positive(),
});