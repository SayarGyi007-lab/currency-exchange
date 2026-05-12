import type { ConversionRequest, ConversionResponse } from "../interfaces/conversion";
import { apiSlice } from "./api";


export const conversionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({ 
    previewConversion: builder.mutation< ConversionResponse, ConversionRequest>({
      query: (data) => ({
        url: "conversion",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  usePreviewConversionMutation,
} = conversionApiSlice;