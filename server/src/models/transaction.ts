import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    fromCurrency: {
      type: Schema.Types.ObjectId,
      ref: "Currency",
      required: true
    },
    toCurrency: {
      type: Schema.Types.ObjectId,
      ref: "Currency",
      required: true
    },
    exchangeRateId: {
      type: Schema.Types.ObjectId,
      ref: "ExchangeRate",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    exchangeRate: {
      type: Number,
      required: true
    },
    convertedAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: Schema.Types.ObjectId,
      ref: "PaymentMethod",
      required: true
    },
    slipImage: {
      type: String,
      required: true
    },
    receiverName: {
      type: String,
      required: true
    },
    receiverBank: {
      type: String,
      required: true
    },
    receiverAccount: {
      type: String,
      required: true
    },
    receiverPhone: {
      type: String,
      required: true
    },
    receiverEmail: {
      type: String,
      required: true
    },
    receiverQr: {
      type: String
    },
    status: {
      type: String,
      enum: ["pending", "received", "processing", "completed", "cancelled"],
      default: "pending",
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    userIP: {
      type: String,
      default: null
    },
    baseCurrency: {
      type: String,
      default: "USD",
    },
    baseAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);