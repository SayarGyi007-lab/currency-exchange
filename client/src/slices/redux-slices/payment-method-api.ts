import type { ICreateAndUpdatePaymentMethod, PaymentMethodResponse } from "../interfaces/payment-method";
import { apiSlice } from "./api";

export const paymentMethodApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createPaymentMethod: builder.mutation({
        query: (data: ICreateAndUpdatePaymentMethod) => ({
            url: "payment",
            method: "POST",
            body: data,
        }),
        invalidatesTags: ["PaymentMethods"],
    }),

    getPaymentByCurrency: builder.query<PaymentMethodResponse, string>({
        query: (currencyId) => ({
            url: `payment/${currencyId}`, 
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
        query: ({ id, ...data }: { id: string } & ICreateAndUpdatePaymentMethod) => ({
            url: `payment/${id}`,
            method: "PUT",
            body: data,
        }),
        invalidatesTags: ["PaymentMethods"],
        }),

        }),
    });

export const {
  useCreatePaymentMethodMutation,
  useGetPaymentByCurrencyQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentMethodMutation,
} = paymentMethodApiSlice;