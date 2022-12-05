import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { AppState } from "../store";
import { Credentials, Usuario } from "../../types";
type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  //   credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).auth.token;
    headers.set("mode", "no-cors");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apislice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<Credentials, any>({
      query: (credential: Credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credential },
      }),
    }),
    listarUsuarios: builder.query<Usuario[], void>({
      query: () => ({
        url: "/admin_list_active_users",
      }),
    }),
    crearUsuario: builder.mutation<any, any>({
      query: (body: any) => ({
        url: "/users",
        method: "POST",
        body: { ...body },
      }),
    }),
    eliminarUsuario: builder.mutation<any, any>({
      query: (id: string) => ({
        url: "/admin_delete_user",
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useListarUsuariosQuery,
  useCrearUsuarioMutation,
  useEliminarUsuarioMutation,
} = apislice;
