import { Document, Types } from "mongoose";

// Interface for ExchangeRate document
export interface IExchangeRate{
  _id: Types.ObjectId;

  fromCurrency: Types.ObjectId;
  toCurrency: Types.ObjectId;

  buyRate: number;
  sellRate: number;

  isActive?: boolean; // optional because default is true


  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateExchangeRate{
  fromCurrency?: Types.ObjectId;
  toCurrency?: Types.ObjectId;
  buyRate?: number;
  sellRate?: number;
};