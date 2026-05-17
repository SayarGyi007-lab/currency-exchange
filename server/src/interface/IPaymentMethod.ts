import { Types } from "mongoose";

export interface IPaymentMethod {
  _id: Types.ObjectId;
  currencyId: Types.ObjectId;

  accountName: string;
  accountNumber: string;
  bankProvider: string;
  qrImage: string;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdatePaymentMethod {
  accountName?: string;
  accountNumber?: string;
  bankProvider?: string;
  qrImage?: string;

  isActive?: boolean;
}