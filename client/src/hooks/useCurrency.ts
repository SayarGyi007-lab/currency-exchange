import type { QueryParams } from "../slices/interfaces/pagination"
import { useGetAllCurrenciesQuery } from "../slices/redux-slices/currency-api"

export function useCurrency(params?: QueryParams){
    const {data, isLoading, error} = useGetAllCurrenciesQuery(params)

    return{
        currency: data?.data ?? [],
        currencyPagination: data?.pagination,
        currencyTotal: data?.pagination?.total ?? 0,
        isLoading, 
        error
    }
}