import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux-slices/auth";
import { apiSlice } from "../redux-slices/api";
import transactionReducer from "../redux-slices/transaction-slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  transaction: transactionReducer,
});