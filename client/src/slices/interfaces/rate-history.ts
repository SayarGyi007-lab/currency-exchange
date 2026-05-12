import type { ExchangeRate } from "./exchange-rate";
import type { Pagination } from "./pagination";
import type { User } from "./user";

export interface RateHistory{
    id: string;
    exchangeRate: ExchangeRate;
    changedBy: User;
    buyOldRate: number;
    buyNewRate: number;
    sellOldRate: number;
    sellNewRate: number;
    createdAt: Date;
}

export interface rateHistoryResponse{
    success: boolean;
    data: RateHistory[]
    pagination: Pagination
}