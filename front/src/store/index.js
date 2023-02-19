/* eslint-disable no-unused-vars */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combinedReducer } from "./reducers";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
