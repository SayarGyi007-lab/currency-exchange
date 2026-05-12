import type { Currency } from "./currency";
import type { Pagination } from "./pagination";
import type { PaymentMethod } from "./payment-method";
import type { User } from "./user";

export interface ICreateTransaction{
    fromCurrency: string;
    toCurrency: string;    
    exchangeRateId: string;
    amount: number;
    exchangeRate: number;
    convertedAmount: number;
    paymentMethod: string;
    slipImage: string;
    receiverName: string;
    receiverBank: string;
    receiverAccount: string;
    receiverPhone: string;
    receiverEmail: string;
    receiverQr?: string;
}

export interface IUpdateTransaction{
    status: "pending" | "received" | "processing" | "completed" | "cancelled";
}

export interface Transaction{
    _id: string;
    fromCurrency: Currency;
    toCurrency: Currency;    
    exchangeRateId: string;
    amount: number;
    exchangeRate: number;
    convertedAmount: number;
    paymentMethod: PaymentMethod;
    slipImage: string;
    receiverName: string;
    receiverBank: string;
    receiverAccount: string;
    receiverPhone: string;
    receiverEmail: string;
    receiverQr?: string;
    status: "pending" | "received" | "processing" | "completed" | "cancelled";
    approvedBy: User;
    userIP: string;
    baseCurrency: 'USD';
    baseAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface TransactionResponse{
    success: boolean;
    data: Transaction[];
    pagination: Pagination
}

