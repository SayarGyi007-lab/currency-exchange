import mongoose from "mongoose";

const exchangeRateSnapshotSchema = new mongoose.Schema({
    fromCurrency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency",
        required: true,
    },
    toCurrency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency",
        required: true,
    },
    buyRate: Number,
    sellRate: Number,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export const ExchangeRateSnapshot = mongoose.model("ExchangeRateSnapshot", exchangeRateSnapshotSchema);