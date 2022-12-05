import { AppState } from "@app/store";
import { createSlice } from "@reduxjs/toolkit";
import { Usuario } from "@types";

const initialState: {
  users: Usuario[];
} = {
  users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
      return state;
    },
    addUser: (state, action) => {
      state.users.push(action.payload.user);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((_) => _.id !== action.payload.id);
    },
  },
});

export const { setUsers, addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUsers = (state: AppState) => state.users.users;
