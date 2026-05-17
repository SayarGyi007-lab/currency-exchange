import type { QueryParams } from "../../../../slices/interfaces/pagination";
import { useGetAllExchangeRatesQuery } from "../../../../slices/redux-slices/exchange-rate-api";

export function useAllExchangeRate(params?:QueryParams){
    const { data, isLoading, error } = useGetAllExchangeRatesQuery(params)

    return {
        exchangeRates: data?.data ?? [],
        exchangeRatesPagination: data?.pagination,
        exchangeRateTotal: data?.pagination?.total ?? 0,
        isLoading,
        error
    }
}