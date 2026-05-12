import mongoose, { Schema } from "mongoose";

const currencySchema = new Schema(
{
    code:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true
    },
    symbol:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }
},
{timestamps:true}
)

export const Currency = mongoose.model("Currency", currencySchema)