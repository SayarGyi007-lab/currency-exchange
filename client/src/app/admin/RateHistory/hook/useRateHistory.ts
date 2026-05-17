import type { QueryParams } from "../../../../slices/interfaces/pagination";
import { useGetAllRateHistoryQuery } from "../../../../slices/redux-slices/rate-history-api";

export function useGetAllRateHistory(params?: QueryParams){
    const {data, isLoading, error} = useGetAllRateHistoryQuery(params)

    return {
        rateHistory: data?.data ?? [],
        rateHistoryPagination: data?.pagination,
        rateHistoryTotal: data?.pagination?.total ?? 0,
        isLoading,
        error
    }
}