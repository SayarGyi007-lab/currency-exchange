import { Request, Response } from "express";
import ConversionService from "../services/conversion.service";
import { asyncHandler } from "../utils/async-handler";

const conversionService = new ConversionService()

export const previewConversion = asyncHandler(async (req: Request, res:Response) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  const result = await conversionService.preview({
    fromCurrency,
    toCurrency,
    amount,
  });

  res.json({
    success: true,
    data: result,
  });
});