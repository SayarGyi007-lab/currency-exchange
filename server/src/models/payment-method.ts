import mongoose, { Schema } from "mongoose"

const paymentMethodSchema = new Schema(
{
    currencyId: {
    type: Schema.Types.ObjectId,
    ref: "Currency",
    required: true
},
    type:{
        type:String,
        enum:["bank","QR"],
        required:true
    },

    accountName:{
        type:String,
        required:function(){
            return this.type === "bank"
        },
    },

    accountNumber:{
        type:String,
        required:function(){
            return this.type === "bank"
        }
    },

    bankProvider:{
        type:String,
        required:function(){
            return this.type === "bank"
        }
    },

    qrImage:{
        type:String,
        required:function(){
            return this.type === "QR"
        }
    },

    isActive:{
        type:Boolean,
        default:true
    }

},
{timestamps:true}
)

export const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema)