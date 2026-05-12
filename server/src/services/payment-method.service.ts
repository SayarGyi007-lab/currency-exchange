import { PaymentMethod } from "../models/payment-method";
import { IPaymentMethod } from "../interface/IPaymentMethod";
import { Currency } from "../models/currency";
import { AppError } from "../utils/app-error";
import { IUpdateCurrency } from "../interface/ICurrency";

class PaymentService{
    async create(data: IPaymentMethod){
        const existing = await PaymentMethod.findOne({
            currencyId: data.currencyId,
            type: data.type
        })
        if (existing) {
            throw new AppError("Payment method already exists", 409);
        }
        const paymentMethod = await PaymentMethod.create(data);
        return paymentMethod;
    }

    async getPaymentByCurrency(currencyId: string){
        const existingCurrency = await Currency.findById(currencyId)
        if(!existingCurrency){
            throw new AppError("No Currency found",404)
        }
        const payment = await PaymentMethod.find({currencyId: currencyId})
        return payment
    }

    async getPaymentById(paymentId: string){
        const payment = await PaymentMethod.findById(paymentId);

        if (!payment) {
            throw new AppError("No Payment Method found", 404);
        }
        return payment
    }

    async updatePaymentByCurrency(paymentId: string, data: IUpdateCurrency) {
        const existingPayment = await PaymentMethod.findById(paymentId);

        if (!existingPayment) {
            throw new AppError("No Payment Method found", 404);
        }

        const updatedPayment = await PaymentMethod.findByIdAndUpdate(
            paymentId,
            { $set: {...data} },
            { new: true }
        );

        return updatedPayment;
    }


}

export default PaymentService