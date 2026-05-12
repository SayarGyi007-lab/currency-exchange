import { Document, Types } from "mongoose";

export interface IRateHistory extends Document {
  _id: Types.ObjectId;

  exchangeRateId: Types.ObjectId;
  
  buyOldRate: number;
  buyNewRate: number;

  sellOldRate: number;
  sellNewRate: number;

  changedBy: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export type IUpdateRateHistory = Partial<IRateHistory>