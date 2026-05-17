import type { Pagination } from "./pagination";

export interface ICreatePaymentMethod {
  currencyId: string;

  accountName: string;
  accountNumber: string;
  bankProvider: string;

  qrImage: string;
}

export interface IUpdatePaymentMethod {
  currencyId: string;

  accountName?: string;
  accountNumber?: string;
  bankProvider?: string;

  qrImage?: string;
}

export interface CurrencyRef {
  _id: string;
  code: string;
  name: string;
}

export interface PaymentMethod {
  _id: string;
  currencyId: CurrencyRef;

  accountName: string;
  accountNumber: string;
  bankProvider: string;

  qrImage: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethodResponse{
    success: boolean;
    data: PaymentMethod[];
    pagination: Pagination
}