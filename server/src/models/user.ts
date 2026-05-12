import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
{
    name:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select: false
    },
    role:{
        type:String,
        enum:["super_admin","admin"],
        default:"admin"
    },
    isActive:{
        type:Boolean,
        default:true
    }
},
{timestamps:true}
)

export const User = mongoose.model("User", userSchema)