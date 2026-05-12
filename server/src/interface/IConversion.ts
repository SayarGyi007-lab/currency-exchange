import { Types } from "mongoose";

export interface IConversion{
    fromCurrency: Types.ObjectId, 
    toCurrency: Types.ObjectId, 
    amount: number
}