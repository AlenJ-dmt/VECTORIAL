import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
const initialState: {
  email: null | String;
  token: null | string;
} = {
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { email, accessToken } = action.payload;
      state.email = email;
      state.token = accessToken;
      localStorage.setItem("accesToken", accessToken);
    },
    logOut: (state, action) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentEmail = (state: AppState) => state.auth.email;
export const selectCurrentToken = (state: AppState) => state.auth.token;
