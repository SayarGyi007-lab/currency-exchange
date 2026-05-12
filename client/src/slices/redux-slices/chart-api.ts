import type { ChartResponse } from "../interfaces/chart";
import { apiSlice } from "./api";

export const chartSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRateChart: builder.query< ChartResponse,{ from: string; to: string; days?: number } >({
      query: ({ from, to, days }) => ({
        url: "rate-chart",
        method: "GET",
        params: {
          from,
          to,
          ...(days ? { days } : {}),
        },
      }),
      providesTags: ["RateChart"],
    }),
  }),
});

export const { useGetRateChartQuery } = chartSlice;