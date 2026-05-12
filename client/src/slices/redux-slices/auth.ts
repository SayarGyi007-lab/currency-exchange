import { createSlice } from "@reduxjs/toolkit"

interface UserInfo{
    _id: string
    name: string
    email: string
    role: "super_admin" | "admin"
    isActive: boolean
}

interface AuthSlice{
    userInfo: UserInfo | null
}

const parseLocalStorage = <T>(key: string): T | null =>{
    try {
        const item = localStorage.getItem(key)
        return item? JSON.parse(item) : null
    } catch (error) {
        localStorage.removeItem(key) //clear corrupted data
        return null
    }
}

const initialState: AuthSlice = {
    userInfo: parseLocalStorage<UserInfo>("userInfo")
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            const {accessToken, refreshToken, ...user} = action.payload
            state.userInfo = user
            localStorage.setItem('userInfo', JSON.stringify(user))

            if(accessToken) localStorage.setItem('accessToken', accessToken)
            if(refreshToken) localStorage.setItem('refreshToken', refreshToken)
        },
        clearUserInfo: (state) =>{
            state.userInfo = null
            localStorage.removeItem('userInfo')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }
})

export const {setUserInfo, clearUserInfo} = authSlice.actions
export default authSlice.reducer