import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import threadReducer from "./slice/threadSlice";

export const persistConfigAuth = {
  key: "auth",
  storage: storage,
};

export const combinedReducer = combineReducers({
  auth: persistReducer(persistConfigAuth, authReducer),
  user: userReducer,
  thread: threadReducer,
});
