import * as z from "zod";

export const createPaymentMethodSchema = z.object({
  type: z.enum(["bank", "QR"], { message: "Type is required" }),
  currencyId: z.string().min(1, "Currency is required"),
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  bankProvider: z.string().optional(),
  qrImage: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === "bank") {
    if (!data.accountName) {
      ctx.addIssue({
        path: ["accountName"],
        message: "Account name is required for bank type",
        code: "custom"
      });
    }
    if (!data.accountNumber) {
      ctx.addIssue({
        path: ["accountNumber"],
        message: "Account number is required for bank type",
        code: "custom"
      });
    }
    if (!data.bankProvider) {
      ctx.addIssue({
        path: ["bankProvider"],
        message: "Bank provider is required for bank type",
        code: "custom"
      });
    }
  }

  if (data.type === "QR" && !data.qrImage) {
    ctx.addIssue({
      path: ["qrImage"],
      message: "QR image is required for QR type",
      code: "custom"
    });
  }
});

export const updatePaymentMethodSchema = z.object({
  type: z.enum(["bank", "QR"]).optional(),
  currencyId: z.string().min(1).optional(),

  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  bankProvider: z.string().optional(),
  qrImage: z.string().optional(),
}).superRefine((data, ctx) => {

  if (data.type === "bank") {
    if (!data.accountName) {
      ctx.addIssue({
        path: ["accountName"],
        message: "Account name is required for bank type",
        code: "custom",
      });
    }
    if (!data.accountNumber) {
      ctx.addIssue({
        path: ["accountNumber"],
        message: "Account number is required for bank type",
        code: "custom",
      });
    }
    if (!data.bankProvider) {
      ctx.addIssue({
        path: ["bankProvider"],
        message: "Bank provider is required for bank type",
        code: "custom",
      });
    }
  }

  if (data.type === "QR") {
    if (!data.qrImage) {
      ctx.addIssue({
        path: ["qrImage"],
        message: "QR image is required for QR type",
        code: "custom",
      });
    }
  }

});