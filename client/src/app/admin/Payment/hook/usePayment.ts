import type { QueryParams } from "../../../../slices/interfaces/pagination"
import { useGetAllPaymentMethodQuery } from "../../../../slices/redux-slices/payment-method-api"


export function usePayment(params?: QueryParams){
    const {data, isLoading, error} = useGetAllPaymentMethodQuery(params)

    return{
        payment: data?.data ?? [],
        paymentPagination: data?.pagination,
        paymentTotal: data?.pagination?.total ?? 0,
        isLoading, 
        error
    }
}