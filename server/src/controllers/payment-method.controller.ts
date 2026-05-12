import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import PaymentService from "../services/payment-method.service";

const paymentService = new PaymentService()

export const createPaymentMethod = asyncHandler(async(req:Request, res:Response)=>{
    const payment = await paymentService.create(req.body)
    res.status(201).json({
        success: true,
        message: "payment created successfully",
        data: payment,
    });
})

export const getPaymentByCurrency = asyncHandler(async(req: Request, res: Response)=>{
    const {currencyId} = req.params as {currencyId: string}
    const result = await paymentService.getPaymentByCurrency(currencyId)
    console.log(result);
    
    res.status(201).json({
        success: true,
        data: result
    })
})

export const getPaymentById = asyncHandler(async(req: Request, res: Response)=>{
    const {paymentId} = req.params as {paymentId: string}
    const payment = await paymentService.getPaymentById(paymentId)
    res.status(201).json({
        success: true,
        data: payment
    })
})

export const updatePaymentByCurrency = asyncHandler(async(req: Request, res: Response)=>{
    const {paymentId} = req.params as {paymentId: string}

    const payment = await paymentService.updatePaymentByCurrency(paymentId, req.body)

    res.json({
        success: true,
        message: "Payment updated successfully",
        data: payment,
    });
})