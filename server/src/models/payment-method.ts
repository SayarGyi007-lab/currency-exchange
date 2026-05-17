import mongoose, { Schema } from "mongoose";

const paymentMethodSchema = new Schema(
  {
    currencyId: {
      type: Schema.Types.ObjectId,
      ref: "Currency",
      required: true,
    },

    accountName: {
      type: String,
      required: true,
    },

    accountNumber: {
      type: String,
      required: true,
    },

    bankProvider: {
      type: String,
      required: true,
    },

    qrImage: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema)