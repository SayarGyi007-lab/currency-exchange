import * as z from "zod";

export const createRateHistorySchema = z.object({
  exchangeRateId: z
    .string({ message: "ExchangeRate ID is required" })
    .min(1, {message: "ExchangeRate ID cannot be empty"}), 

  oldRate: z
    .number({ message: "Old rate is required" }),

  newRate: z
    .number({ message: "New rate is required" }),
    
  changedBy: z
    .string({ message: "ChangedBy ID is required" })
    .min(1, {message: "ChangedBy ID cannot be empty"})
});

export const updateRateHistorySchema = createRateHistorySchema.partial();