import type { QueryParams } from "../interfaces/pagination";
import type { ICreateTransaction, TransactionResponse, IUpdateTransaction } from "../interfaces/transaction";
import { apiSlice } from "./api";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createTransaction: builder.mutation({
        query: (data: ICreateTransaction) => ({
            url: "transaction",
            method: "POST",
            body: data,
        }),
        invalidatesTags: ["Transactions"],
    }),

    getAllTransactions: builder.query<TransactionResponse, QueryParams | void>({
        query: (params) => ({
            url: "transaction",
            method: "GET",
            params: params ?? undefined,
        }),
        providesTags: ["Transactions"],
    }),

    getTransactionById: builder.query({
        query: (id: string) => ({
            url: `transaction/${id}`,
            method: "GET",
        }),
        providesTags: ["Transactions"],
    }),

    updateTransactionStatus: builder.mutation({
        query: ({ id, ...data }: { id: string} & IUpdateTransaction) => ({
            url: `transaction/${id}/status`,
            method: "PUT",
            body: data,
        }),
        invalidatesTags: ["Transactions"],
    }),

  }),
});

export const {
  useCreateTransactionMutation,
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
  useUpdateTransactionStatusMutation,
} = transactionApiSlice;