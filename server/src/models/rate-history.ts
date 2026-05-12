import mongoose, { Schema } from "mongoose"

const rateHistorySchema = new Schema(
{
    exchangeRateId:{
        type: Schema.Types.ObjectId,
        ref: "ExchangeRate",
        required: true
    },
    buyOldRate:{
        type: Number,
        required: true
    },
    buyNewRate:{
        type: Number,
        required: true
    },
    sellOldRate:{
        type: Number,
        required: true
    },
    sellNewRate:{
        type: Number,
        required: true
    },
    changedBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{timestamps:true}
)

export const RateHistory = mongoose.model("RateHistory", rateHistorySchema)