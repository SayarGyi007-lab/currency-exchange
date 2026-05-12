import type { IChangePassword, IUpdateUser, IUserLogin, IUserRegister } from "../interfaces/auth";
import { apiSlice } from "./api";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register: builder.mutation({
            query: (data: IUserRegister)=>({
                url: "auth/register",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Users']
        }),
        login: builder.mutation({
            query:(data: IUserLogin)=>({
                url: 'auth/login',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Users']
        }),
        logout: builder.mutation({
            query:()=>{
                const refreshToken = localStorage.getItem('refreshToken');

                return{
                    url: "auth/logout",
                    method: "POST",
                    headers:{
                        "x-refresh-token": refreshToken || ""
                    }
                }
            },
            invalidatesTags: ['Users']
        }),
        updateUser: builder.mutation({
            query:({id, ...data}: {id: string} & IUpdateUser)=>({
                url: `auth/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: (_result, _error, {id}) => [
                {type: "Users", id},
                "Users"
            ]
        }),
        changePassword: builder.mutation({
            query: ({ id, data }: { id: string; data: IChangePassword }) =>({
                url: `auth/${id}/change-password`,
                method: "PUT",
                body: data
            })
        })
    })
})

export const {
    useRegisterMutation, 
    useLoginMutation, 
    useLogoutMutation, 
    useUpdateUserMutation, 
    useChangePasswordMutation
} = authApiSlice