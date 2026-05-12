import type { QueryParams } from "../interfaces/pagination";
import type { rateHistoryResponse } from "../interfaces/rate-history";
import { apiSlice } from "./api";

export const rateHistorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getRateHistoryByCurrency: builder.query<rateHistoryResponse, string>({
            query: (exchangeRateId) =>({
                url: `rate-history/exchange/${exchangeRateId}`,
                method: "GET"
            }),
            providesTags: ["RateHistories"]
        }),
        getAllRateHistory: builder.query<rateHistoryResponse,QueryParams | void>({
            query: (params) => ({
                url: 'rate-history',
                method: "GET",
                params: params ?? undefined
            }),
            providesTags: ["RateHistories"]
        })  
    })
})

export const {useGetAllRateHistoryQuery, useLazyGetAllRateHistoryQuery} = rateHistorySlice