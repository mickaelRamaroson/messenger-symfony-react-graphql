import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import authReducer from "./slice/authSlice";

export const persistConfigAuth = {
  key: "auth",
  storage: storage,
};

export const combinedReducer = combineReducers({
  auth: persistReducer(persistConfigAuth, authReducer),
});
