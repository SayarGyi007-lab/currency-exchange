import * as z from "zod";

export const createExchangeRateSchema = z.object({
    fromCurrency: z
        .string()
        .min(1, {message: "fromCurrency is required"}) 
        .regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid fromCurrency ObjectId"}),

    toCurrency: z
        .string()
        .min(1, {message: "toCurrency is required"})
        .regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid toCurrency ObjectId"}),

    buyRate: z
        .number({message:"Rate must be a number"})
        .positive({message:"Rate must be greater than 0"}),

    sellRate: z
        .number({message:"Rate must be a number"})
        .positive({message:"Rate must be greater than 0"}),
});

export const updateExchangeRateSchema = z.object({
    fromCurrency: z
        .string()
        .min(1, {message: "fromCurrency is required"}) 
        .regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid fromCurrency ObjectId"})
        .optional(),

    toCurrency: z
        .string()
        .min(1, {message: "toCurrency is required"})
        .regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid toCurrency ObjectId"})
        .optional(),

    buyRate: z
        .number({message:"Rate must be a number"})
        .positive({message:"Rate must be greater than 0"})
        .optional(),

    sellRate: z
        .number({message:"Rate must be a number"})
        .positive({message:"Rate must be greater than 0"})
        .optional(),
});