import type { ExchangeRateResponse, ICreateAndUpdateExchangeRate } from "../interfaces/exchange-rate";
import type { QueryParams } from "../interfaces/pagination";
import { apiSlice } from "./api";

export const exchangeRateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createExchangeRate: builder.mutation({
      query: (data: ICreateAndUpdateExchangeRate) => ({
        url: "exchange-rate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ExchangeRates"],
    }),

    getAllExchangeRates: builder.query<ExchangeRateResponse, QueryParams | void>({
      query: (params) => ({
        url: "exchange-rate",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["ExchangeRates"],
    }),

    getExchangeRateById: builder.query({
      query: (id: string) => ({
        url: `exchange-rate/${id}`,
        method: "GET",
      }),
      providesTags: ["ExchangeRates"],
    }),

    updateExchangeRate: builder.mutation({
      query: ({ id, ...data }: { id: string } & Partial<ICreateAndUpdateExchangeRate>) => ({
        url: `exchange-rate/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ExchangeRates"],
    }),

    archiveExchangeRate: builder.mutation({
      query: (id: string) => ({
        url: `exchange-rate/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: ["ExchangeRates"],
    }),

    restoreExchangeRate: builder.mutation({
      query: (id: string) => ({
        url: `exchange-rate/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["ExchangeRates"],
    }),

  }),
});

export const {
  useCreateExchangeRateMutation,
  useGetAllExchangeRatesQuery,
  useArchiveExchangeRateMutation,
  useRestoreExchangeRateMutation,
  useUpdateExchangeRateMutation,
  useGetExchangeRateByIdQuery
} = exchangeRateApiSlice