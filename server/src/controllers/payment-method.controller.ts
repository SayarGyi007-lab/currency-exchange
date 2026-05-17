import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import PaymentService from "../services/payment-method.service";
import { buildQuery } from "../utils/pagination";

const paymentService = new PaymentService();

// CREATE
export const createPaymentMethod = asyncHandler(async (req: Request, res: Response) => {
  const payment = await paymentService.create(req.body);

  res.status(201).json({
    success: true,
    message: "Payment created successfully",
    data: payment,
  });
});

// GET BY CURRENCY
export const getPaymentByCurrency = asyncHandler(async (req: Request, res: Response) => {
  const { currencyId } = req.params as { currencyId: string };

  const result = await paymentService.getPaymentByCurrency(currencyId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// GET BY ID
export const getPaymentById = asyncHandler(async (req: Request, res: Response) => {
  const { paymentId } = req.params as { paymentId: string };

  const payment = await paymentService.getPaymentById(paymentId);

  res.status(200).json({
    success: true,
    data: payment,
  });
});

// UPDATE (FIXED NAME)
export const updatePaymentById = asyncHandler(async (req: Request, res: Response) => {
  const { paymentId } = req.params as { paymentId: string };

  const payment = await paymentService.updatePaymentById(paymentId, req.body);

  res.status(200).json({
    success: true,
    message: "Payment updated successfully",
    data: payment,
  });
});

// GET ALL (PAGINATION + SEARCH)
export const getAllPaymentMethods = asyncHandler(async (req: Request, res: Response) => {
  const query = buildQuery(req);

  const result = await paymentService.getAll(query);

  res.status(200).json({
    success: true,
    data: result.data,
    pagination: {
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    },
  });
});