import { Types } from "mongoose";


export interface ITransaction{
  _id: Types.ObjectId;

  fromCurrency: Types.ObjectId;
  toCurrency: Types.ObjectId;    
  exchangeRateId: Types.ObjectId;

  amount: number;
  exchangeRate: number;
  convertedAmount: number;

  paymentMethod: Types.ObjectId;

  slipImage: string;

  receiverName: string;
  receiverBank: string;
  receiverAccount: string;
  receiverPhone: string;
  receiverEmail: string;

  receiverQr?: string;

  status: "pending" | "received" | "processing" | "completed" | "cancelled";

  approvedBy: Types.ObjectId;

  userIP: string;

  baseCurrency: string;

  baseAmount: number

  createdAt: Date;
  updatedAt: Date;
}

// export type IUpdateTransaction = Partial<ITransaction> // no need maybe