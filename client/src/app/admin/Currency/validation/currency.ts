import * as z from "zod";

export const createCurrencySchema = z.object({
  code: z
    .string()
    .min(1, {message: "Currency code is required and must be at least 1 character"})
    .max(5, {message: "Currency code can be at most 5 characters"}),

  name: z
    .string()
    .min(2, {message: "Currency name must be at least 2 characters"})
    .max(30, {message: "Currency name can be at most 10 characters"}),

  symbol: z
    .string()
    .min(1, {message: "Currency symbol must be at least 2 characters"})
    .max(5, {message: "Currency name can be at most 5 characters"})
});

export const updateCurrencySchema = z.object({
  code: z
    .string()
    .min(1, {message: "Currency code is required and must be at least 1 character"})
    .max(5, {message: "Currency code can be at most 5 characters"})
    .optional(),

  name: z
    .string()
    .min(2, {message: "Currency name must be at least 2 characters"})
    .max(30, {message: "Currency name can be at most 10 characters"})
    .optional(),

  symbol: z
    .string()
    .min(1, {message: "Currency symbol must be at least 2 characters"})
    .max(5, {message: "Currency name can be at most 5 characters"})
    .optional()
});