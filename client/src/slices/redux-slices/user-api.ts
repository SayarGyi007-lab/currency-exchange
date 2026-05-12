import type { QueryParams } from "../interfaces/pagination";
import type { UsersResponse } from "../interfaces/user";
import { apiSlice } from "./api";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        archiveUser: builder.mutation({
            query: (id: string) =>({
                url: `user/${id}/archive`,
                method: "PATCH"
            }),
            invalidatesTags: ["Users"]
        }),
        restoreUser: builder.mutation({
            query: (id: string) =>({
                url: `user/${id}/restore`,
                method: "PATCH"
            }),
            invalidatesTags: ["Users"]
        }),
        deleteUser: builder.mutation({
            query: (id: string) =>({
                url: `user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"]
        }),
        getMe: builder.query<UsersResponse, void>({
            query: () =>({
                url: "user/me",
                method: "GET"
            }),
            providesTags: ["Users"]
        }),
        getAllUsers: builder.query<UsersResponse, QueryParams | void>({
            query: (params)=>({
                url: "user",
                method: "GET",
                params: params ?? undefined
            }),
            providesTags: ["Users"]
        })
    })
})

export const {
    useArchiveUserMutation, 
    useRestoreUserMutation, 
    useDeleteUserMutation, 
    useGetMeQuery, 
    useGetAllUsersQuery
} = userApiSlice