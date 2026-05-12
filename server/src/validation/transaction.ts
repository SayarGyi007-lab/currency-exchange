import * as z from "zod";

export const createTransactionSchema = z.object({
  fromCurrency: z
    .string({ message: "From currency ID is required" })
    .min(1, { message: "From currency ID cannot be empty" }),
    
  toCurrency: z
    .string({ message: "To currency ID is required" })
    .min(1, { message: "To currency ID cannot be empty" }),
    
  exchangeRateId: z
    .string({ message: "ExchangeRate ID is required" })
    .min(1, { message: "ExchangeRate ID cannot be empty" }),
    
  amount: z
    .number({ message: "Amount must be a number" }),

  exchangeRate: z
    .number({ message: "Exchange rate must be a number" }),

  convertedAmount: z
    .number({ message: "Converted amount must be a number" }),
  
  paymentMethod: z
    .string({ message: "This field is required" }),

  slipImage: z
    .string({ message: "Slip image is required" })
    .min(1, { message: "Slip image cannot be empty" }),
  
  receiverName: z
    .string({ message: "Receiver name is required" })
    .min(1, { message: "Receiver name cannot be empty" }),

  receiverBank: z
    .string({ message: "Receiver bank is required" })
    .min(1, { message: "Receiver bank cannot be empty" }),

  receiverAccount: z
    .string({ message: "Receiver account is required" })
    .min(1, { message: "Receiver account cannot be empty" }),

  receiverPhone: z
    .string({ message: "Receiver phone is required" })
    .min(1, { message: "Receiver phone cannot be empty" }),

  receiverEmail: z
    .string({message: "Receiver Email is required"})
    .min(1,{message: "Receiver email cannot be empty"}),
  
  receiverQr: z
    .string()
    .optional(),
  
  // approvedBy: z
  //   .string({ message: "This field is required" }),

  // userIP: z
  //   .string({ message: "Ip is required" })
});

export const updateTransactionSchema = createTransactionSchema.partial();

export const updateStatusSchema = z.object({
  status: z.enum(["pending", "received", "processing", "completed", "cancelled"])
});