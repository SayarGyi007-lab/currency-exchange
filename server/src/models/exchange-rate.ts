import mongoose, { Schema } from "mongoose"

const exchangeRateSchema = new Schema(
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
        buyRate: {
            type: Number,
            required: true
        },
        sellRate: {
            type: Number,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)

export const ExchangeRate = mongoose.model("ExchangeRate", exchangeRateSchema)