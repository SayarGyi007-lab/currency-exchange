import { QueryOptions } from "utils/pagination";
import { RateHistory } from "../models/rate-history";
import { AppError } from "../utils/app-error";
import { Currency } from "../models/currency";
import { ExchangeRate } from "../models/exchange-rate";

class RateHistoryService {
    async getByExchangeRate(exchangeRateId: string) {

        const history = await RateHistory.find({ exchangeRateId })
            .populate({
                path: "exchangeRateId",
                populate: [
                    { path: "fromCurrency", select: "code name" },
                    { path: "toCurrency", select: "code name" },
                ],
            })
            .populate("changedBy", "name email")
            .sort({ createdAt: -1 }); // newest first

        if (!history || history.length === 0) {
            throw new AppError("No rate history found", 404);
        }

        return history;
    }

    async getAllExchangeRate(query: QueryOptions) {
        const { page, limit, skip, sortBy, order, fromCurrency, toCurrency } = query;

        const filter: any = {};

        //find matching currencies
        let fromIds: any[] = [];
        let toIds: any[] = [];

        if (fromCurrency) {
            const fromCurrencies = await Currency.find({
                code: { $regex: fromCurrency, $options: "i" }
            }).select("_id");

            fromIds = fromCurrencies.map(c => c._id);
        }

        if (toCurrency) {
            const toCurrencies = await Currency.find({
                code: { $regex: toCurrency, $options: "i" }
            }).select("_id");

            toIds = toCurrencies.map(c => c._id);
        }

        if (fromCurrency || toCurrency) {
            const exchangeRates = await ExchangeRate.find({
                ...(fromIds.length && { fromCurrency: { $in: fromIds } }),
                ...(toIds.length && { toCurrency: { $in: toIds } }),
            }).select("_id");

            const exchangeRateIds = exchangeRates.map(e => e._id);

            filter.exchangeRateId = { $in: exchangeRateIds };
        }

        // query rate history
        const [data, total] = await Promise.all([
            RateHistory.find(filter)
                .populate({
                    path: "exchangeRateId",
                    populate: [
                        { path: "fromCurrency", select: "code name symbol" },
                        { path: "toCurrency", select: "code name symbol" },
                    ],
                })
                .populate("changedBy", "name email")
                .sort({ [sortBy]: order === "desc" ? 1 : -1 })
                .skip(skip)
                .limit(limit),

            RateHistory.countDocuments(filter),
        ]);

        return {
            data,
            total,
            page,
            totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
        };
    }
}

export default RateHistoryService