import type { QueryParams } from "../../slices/interfaces/pagination"
import { useGetAllUsersQuery } from "../../slices/redux-slices/user-api"

export function useUser(paramas?: QueryParams){
    const { data, isLoading, error} = useGetAllUsersQuery(paramas)

    return{
        user: data?.data ?? [],
        userPagination: data?.pagination,
        userTotal: data?.pagination?.total ?? 0,
        isLoading,
        error
    }
}