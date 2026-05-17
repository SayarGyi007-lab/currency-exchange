import { ExchangeRate } from "../models/exchange-rate";
import { Currency } from "../models/currency";
import { IConversion } from "../interface/IConversion";
import { AppError } from "../utils/app-error";

class ConversionService {

  async preview(data: IConversion) {
    const { fromCurrency, toCurrency, amount } = data;

    const from = fromCurrency.toString();
    const to = toCurrency.toString();

    const populatedRates = await ExchangeRate.find({
      isActive: true,
    }).populate("fromCurrency toCurrency");

    const rates = populatedRates.filter((r: any) => {
      return (
        r.fromCurrency &&
        r.toCurrency &&
        r.fromCurrency.isActive &&
        r.toCurrency.isActive
      );
    });

    const fromExists = await Currency.exists({ _id: from, isActive: true });
    const toExists = await Currency.exists({ _id: to, isActive: true });

    if (!fromExists || !toExists) {
      throw new AppError("Selected currency no longer exists", 400);
    }

    const map: any = {};

    rates.forEach((r: any) => {
      const f = r.fromCurrency._id.toString();
      const t = r.toCurrency._id.toString();

      if (!map[f]) map[f] = {};
      if (!map[t]) map[t] = {};

      map[f][t] = {
        rate: r.buyRate,
        id: r._id.toString(),
      };

      if (!map[t][f]) {
        map[t][f] = {
          rate: 1 / r.sellRate,
          id: r._id.toString(),
        };
      }
    });

    if (map[from]?.[to]) {
      const r = map[from][to];

      return {
        type: "direct",
        steps: [{
          from,
          to,
          rate: Number(r.rate.toFixed(4)),
          exchangeRateId: r.id,
        }],
        finalAmount: Number((amount * r.rate).toFixed(4)),
        finalRate: Number(r.rate.toFixed(4)),
      };
    }

    for (const bridge in map) {
      if (map[from]?.[bridge] && map[bridge]?.[to]) {

        const r1 = map[from][bridge];
        const r2 = map[bridge][to];

        const rate = r1.rate * r2.rate;

        return {
          type: "bridge",
          steps: [
            {
              from,
              to: bridge,
              rate: Number(r1.rate.toFixed(4)),
              exchangeRateId: r1.id,
            },
            {
              from: bridge,
              to,
              rate: Number(r2.rate.toFixed(4)),
              exchangeRateId: r2.id,
            },
          ],
          finalAmount: Number((amount * rate).toFixed(4)),
          finalRate: Number(rate.toFixed(4)),
        };
      }
    }

    throw new AppError("No conversion path found", 404);
  }
}

export default ConversionService;