import type { QueryParams } from "../../../../slices/interfaces/pagination"
import { useGetAllTransactionsQuery } from "../../../../slices/redux-slices/transaction-api"

export function useTransaction(params?: QueryParams){
    const {data, isLoading, error} = useGetAllTransactionsQuery(params)
    
    return{
        transaction: data?.data ?? [],
        transactionPagination: data?.pagination,
        transactionTotal: data?.pagination?.total ?? 0,
        isLoading, 
        error
    }
}