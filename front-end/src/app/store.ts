import { configureStore } from "@reduxjs/toolkit";
import { apislice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/usersSlice";
export const store = configureStore({
  reducer: {
    [apislice.reducerPath]: apislice.reducer,
    auth: authReducer,
    users: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apislice.middleware),
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
