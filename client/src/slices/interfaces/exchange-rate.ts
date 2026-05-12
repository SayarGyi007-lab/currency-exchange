import type { Currency } from "./currency";
import type { Pagination } from "./pagination";

export interface ICreateAndUpdateExchangeRate {
    fromCurrency: string;
    toCurrency: string;
    buyRate: number;
    sellRate: number;
}

export interface ExchangeRate{
    id: string;
    fromCurrency: Currency;
    toCurrency: Currency;
    buyRate: number;
    sellRate: number;
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ExchangeRateResponse {
  success: boolean;
  data: ExchangeRate[];
  pagination: Pagination;
}

