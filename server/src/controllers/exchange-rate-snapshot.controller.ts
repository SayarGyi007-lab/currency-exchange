import { Request, Response } from "express";
import ExchangeRateSnapshotService from "../services/exchange-rate-snapshot.service";
import { asyncHandler } from "../utils/async-handler";

const exchangeRateSnapShotService = new ExchangeRateSnapshotService()

export const getExchangeRateSnapshotHistory = asyncHandler(async (req: Request, res: Response) => {
  const { from, to, days } = req.query;

  if (!from || !to) {
    res.status(400).json({
      success: false,
      message: "from and to currencies are required",
    });
  }

  const parsedDays = days ? parseInt(days as string) : undefined;

  const data = await exchangeRateSnapShotService.getHistory(
    from as string,
    to as string,
    parsedDays
  );

  res.status(200).json({
    success: true,
    message: "exchange rate history fetched successfully",
    data,
  });
});