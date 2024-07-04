import { LoginResponseType, RegisterPayload } from "@/types/types";
import { User } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      typeof window === "undefined"
        ? "http://localhost:3000"
        : window.location.origin,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponseType,
      {
        userName: string;
        password: string;
      }
    >({
      query: ({ userName, password }) => ({
        url: "/api/login",
        method: "POST",
        body: {
          userName,
          password,
        },
      }),
    }),
    getAuthData: builder.query<LoginResponseType, { token: string }>({
      query: ({ token }) => ({
        url: "api/auth-details",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    register: builder.mutation<LoginResponseType, RegisterPayload>({
      query: ({
        userName,
        password,
        firstName,
        lastName,
      }: RegisterPayload) => ({
        url: "/api/register",
        method: "POST",
        body: {
          userName,
          password,
          firstName,
          lastName,
        },
      }),
    }),
  }),
  keepUnusedDataFor: 600,
});

export const { useLoginMutation, useGetAuthDataQuery, useRegisterMutation } =
  authApi;
