export interface ICreateAndUpdatePaymentMethod {
    currencyId: string; 
    type: "bank" | "QR";
    accountName: string;
    accountNumber: string;
    bankProvider: string;
    qrImage: string;

}

export interface PaymentMethod{
    id: string;
    currencyId: string;
    type: "bank" | "QR";
    accountName: string;
    accountNumber: string;
    bankProvider: string;
    qrImage: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentMethodResponse{
    success: boolean;
    data: PaymentMethod[]
}