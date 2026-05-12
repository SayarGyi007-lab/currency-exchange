import {Types } from "mongoose";

// Interface for PaymentMethod document
export interface IPaymentMethod{
    _id: Types.ObjectId;
    currencyId: Types.ObjectId;

    type: "bank" | "QR";

    // Bank fields (only when type === "bank")
    accountName?: string;
    accountNumber?: string;
    bankProvider?: string;

    // QR field (only when type === "QR")
    qrImage?: string;

    isActive?: boolean;

    createdAt: Date;
    updatedAt: Date;
}

export interface IUpdatePaymentMethod {
    type: "bank" | "QR";

    // Bank fields (only when type === "bank")
    accountName?: string;
    accountNumber?: string;
    bankProvider?: string;

    // QR field (only when type === "QR")
    qrImage?: string;

}

