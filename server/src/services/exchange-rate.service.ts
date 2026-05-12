import { ExchangeRate } from "../models/exchange-rate";
import { IExchangeRate, IUpdateExchangeRate } from "../interface/IExchangeRate";
import { AppError } from "../utils/app-error";
import { RateHistory } from "../models/rate-history";
import { QueryOptions } from "utils/pagination";
import { Currency } from "../models/currency";
import mongoose from "mongoose";
import { ExchangeRateSnapshot } from "../models/exchange-rate-snapshot";

class ExchangeRateService {
    async create(data: IExchangeRate & { changedBy: string }) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const existing = await ExchangeRate.findOne({
                fromCurrency: data.fromCurrency,
                toCurrency: data.toCurrency,
                isActive: true,
            }).session(session);

            if (existing) {
                throw new AppError("Exchange rate already exists", 409);
            }

            const rate = new ExchangeRate({
                fromCurrency: data.fromCurrency,
                toCurrency: data.toCurrency,
                buyRate: data.buyRate,
                sellRate: data.sellRate,
            });

            await rate.save({ session });

            const createdRate = rate;

            await RateHistory.create(
                [
                    {
                        exchangeRateId: createdRate._id,
                        buyNewRate: data.buyRate,
                        buyOldRate: 0,
                        sellNewRate: data.sellRate,
                        sellOldRate: 0,
                        changedBy: data.changedBy,
                    },
                ],
                { session }
            );

            await ExchangeRateSnapshot.create(
                [
                    {
                        fromCurrency: data.fromCurrency,
                        toCurrency: data.toCurrency,
                        buyRate: data.buyRate,
                        sellRate: data.sellRate,
                    },
                    {
                        fromCurrency: data.toCurrency,
                        toCurrency: data.fromCurrency,
                        buyRate: 1 / data.sellRate,
                        sellRate: 1 / data.buyRate,
                    },
                ],
                { session }
            );

            await session.commitTransaction();
            session.endSession();

            return createdRate;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    async update(exchangeId: string, data: IUpdateExchangeRate, changedBy: string) {
        const rate = await ExchangeRate.findById(exchangeId);

        if (!rate || !rate.isActive) {
            throw new AppError("Exchange rate not found", 404);
        }

        const oldBuy = rate.buyRate;
        const oldSell = rate.sellRate;

        if (data.buyRate !== undefined) rate.buyRate = data.buyRate;
        if (data.sellRate !== undefined) rate.sellRate = data.sellRate;
        if (data.fromCurrency !== undefined) rate.fromCurrency = data.fromCurrency;
        if (data.toCurrency !== undefined) rate.toCurrency = data.toCurrency;

        await rate.save();



        if (data.buyRate !== undefined || data.sellRate !== undefined) {
            await RateHistory.create({
                exchangeRateId: rate._id,
                buyOldRate: oldBuy,
                buyNewRate: rate.buyRate,
                sellOldRate: oldSell,
                sellNewRate: rate.sellRate,
                changedBy,
            });

            await ExchangeRateSnapshot.create([
                {
                    fromCurrency: rate.fromCurrency,
                    toCurrency: rate.toCurrency,
                    buyRate: rate.buyRate,
                    sellRate: rate.sellRate,
                },
                {
                    fromCurrency: rate.toCurrency,
                    toCurrency: rate.fromCurrency,
                    buyRate: 1 / rate.sellRate,
                    sellRate: 1 / rate.buyRate,
                },
            ]);
        }

        return rate;
    }

    async getById(exchangeId: string) {
        const rate = await ExchangeRate.findById(exchangeId)
            .populate("fromCurrency", "name code")
            .populate("toCurrency", "name code");

        if (!rate || !rate.isActive) {
            throw new AppError("Exchange rate not found", 404);
        }

        return rate;
    }

    async getAll(query: QueryOptions) {
        const { page, limit, skip, search, sortBy, order } = query;

        const filter: any = { isActive: true };

        if (search) {

            const currencies = await Currency.find({
                code: { $regex: search, $options: "i" }
            }).select("_id");

            const currencyIds = currencies.map(c => c._id);

            filter.$or = [
                { fromCurrency: { $in: currencyIds } },
                { toCurrency: { $in: currencyIds } },
            ];
        }

        const [data, total] = await Promise.all([
            ExchangeRate.find(filter)
                .populate("fromCurrency", "name code symbol")
                .populate("toCurrency", "name code symbol")
                .sort({ [sortBy]: order === "asc" ? 1 : -1 })
                .skip(skip)
                .limit(limit),

            ExchangeRate.countDocuments(filter),
        ]);

        return {
            data,
            total,
            page,
            totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
        };
    }

    async softDelete(id: string) {
        const rate = await ExchangeRate.findById(id);

        if (!rate || !rate.isActive) {
            throw new AppError("Exchange rate not found", 404);
        }

        rate.isActive = false;
        await rate.save();

        return { message: "Exchange rate deactivated" };
    }

    async restore(id: string) {
        const rate = await ExchangeRate.findById(id);

        if (!rate) {
            throw new AppError("Exchange rate not found", 404);
        }

        rate.isActive = true;
        await rate.save();

        return { message: "Exchange rate restored" };
    }
}

export default ExchangeRateService