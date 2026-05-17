import type { QueryParams } from "../interfaces/pagination";
import type {  ICreatePaymentMethod, IUpdatePaymentMethod, PaymentMethodResponse } from "../interfaces/payment-method";
import { apiSlice } from "./api";

export const paymentMethodApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createPaymentMethod: builder.mutation({
        query: (data: ICreatePaymentMethod) => ({
            url: "payment",
            method: "POST",
            body: data,
        }),
        invalidatesTags: ["PaymentMethods"],
    }),

    getPaymentByCurrency: builder.query<PaymentMethodResponse, string>({
        query: (currencyId) => ({
            url: `payment/currency/${currencyId}`, 
            method: "GET",
        }),
        providesTags: ["PaymentMethods"],
    }),

    getPaymentById: builder.query({
        query: (paymentId: string) => ({
            url: `payment/${paymentId}`,
            method: "GET",
        }),
        providesTags: ["PaymentMethods"],
    }),

    updatePaymentMethod: builder.mutation({
        query: ({ id, ...data }: { id: string } & IUpdatePaymentMethod) => ({
            url: `payment/${id}`,
            method: "PUT",
            body: data,
        }),
        invalidatesTags: ["PaymentMethods"],
    }),

    getAllPaymentMethod: builder.query<PaymentMethodResponse, QueryParams | void>({
        query: (params) => ({
            url: "payment",
            method: "GET",
            params: params ?? undefined
        }),
        providesTags: ["PaymentMethods"]
    })

    }),
    });
    

export const {
  useCreatePaymentMethodMutation,
  useGetPaymentByCurrencyQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentMethodMutation,
  useGetAllPaymentMethodQuery
} = paymentMethodApiSlice;