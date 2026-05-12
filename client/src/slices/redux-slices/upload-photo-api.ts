import { apiSlice } from "./api";

export const uploadPhotoSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        upload: builder.mutation<{data: string}, FormData>({
            query: (formData)=>({
                url: "upload",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["Photos"]
        }),
        adminUpload: builder.mutation<{data: string}, FormData>({
            query: (formData) =>({
                url: "upload/admin",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ['Photos']
        })
    })
})

export const {useUploadMutation} = uploadPhotoSlice