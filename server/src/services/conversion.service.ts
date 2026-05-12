import { ExchangeRate } from "../models/exchange-rate";
import { IConversion } from "../interface/IConversion";

class ConversionService {
  async preview(data: IConversion) {
    const { fromCurrency, toCurrency, amount } = data;

    const from = fromCurrency.toString();
    const to = toCurrency.toString();

    const rates = await ExchangeRate.find({ isActive: true })
      .populate("fromCurrency toCurrency");

    const map: Record<
      string,
      Record<string, { rate: number; id: string }>
    > = {};

    rates.forEach((r: any) => {
      const f = r.fromCurrency._id.toString();
      const t = r.toCurrency._id.toString();

      if (!map[f]) map[f] = {};
      if (!map[t]) map[t] = {};

      // Direct rate
      map[f][t] = {
        rate: r.buyRate,
        id: r._id.toString(),
      };

      // Reverse rate
      if (!map[t][f]) {
        map[t][f] = {
          rate: 1 / r.sellRate,
          id: r._id.toString(),
        };
      }
    });

    // DIRECT CONVERSION
    if (map[from]?.[to]) {
      const r = map[from][to];

      const finalRate = Number(r.rate.toFixed(4));
      const finalAmount = Number((amount * r.rate).toFixed(4));

      return {
        type: "direct",
        steps: [
          {
            from,
            to,
            rate: finalRate,
            exchangeRateId: r.id,
          },
        ],
        finalAmount,
        finalRate,
      };
    }

    // BRIDGE CONVERSION
    for (const bridge in map) {
      if (map[from]?.[bridge] && map[bridge]?.[to]) {
        const r1 = map[from][bridge];
        const r2 = map[bridge][to];

        const calculatedRate = r1.rate * r2.rate;

        const finalRate = Number(calculatedRate.toFixed(4));
        const finalAmount = Number(
          (amount * calculatedRate).toFixed(4)
        );

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
          finalAmount,
          finalRate,
        };
      }
    }

    throw new Error("No conversion path found");
  }
}

export default ConversionService;