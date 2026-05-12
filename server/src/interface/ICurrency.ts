import { Document, Types } from "mongoose";

export interface ICurrency{
  _id: Types.ObjectId; 
  symbol: string;
  code: string;        // Currency code, e.g., "USD"
  name: string;        // Currency name, e.g., "US Dollar"
  createdAt: Date;     // From timestamps
  updatedAt: Date;     // From timestamps
}

export interface IUpdateCurrency{
  symbol: string
  code: string;        // Currency code, e.g., "USD"
  name: string;        // Currency name, e.g., "US Dollar"
}