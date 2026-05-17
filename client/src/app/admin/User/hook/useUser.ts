import type { QueryParams } from "../../../../slices/interfaces/pagination"
import { useGetAllUsersQuery, useGetMeQuery } from "../../../../slices/redux-slices/user-api"

export function useUser(paramas?: QueryParams){
    const { data, isLoading, error} = useGetAllUsersQuery(paramas)

    return{
        users: data?.data ?? [],
        usersPagination: data?.pagination,
        usersTotal: data?.pagination?.total ?? 0,
        isLoading,
        error
    }
}

export function useGetMe(){
    const {data, isLoading, error} = useGetMeQuery()

    return{
        user: data?.data || undefined,
        isLoading, 
        error
    }
}