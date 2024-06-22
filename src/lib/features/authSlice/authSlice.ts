import { setAuthCookie } from "@/lib/cookies";
import { authApi } from "@/lib/features/authSlice/authApiSlice";
import { RootState } from "@/lib/store";
import { LoginResStateType } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

const initialState: Partial<LoginResStateType> = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<LoginResStateType>) {
      const { userName } = action.payload;
      state.userName = userName;
    },
    logOut(state) {
      state.userName = null;
      state.token = "";
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          setAuthCookie(payload.token, "auth_token");
          return payload;
        }
      )
      .addMatcher(
        authApi.endpoints.getAuthData.matchFulfilled,
        (_state, { payload }) => {
          setAuthCookie(payload.token, "auth_token");
          return payload;
        }
      );
  },
});

export const getAuthState = (state: RootState) => state.authSlice;

export const { logOut, setCredentials } = authSlice.actions;

export default authSlice.reducer;
