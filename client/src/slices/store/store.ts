import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../redux-slices/api";
import { rootReducer } from "./rootReducer";

import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/es/storage";

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["transaction"],
};

// wrap reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware as any),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;