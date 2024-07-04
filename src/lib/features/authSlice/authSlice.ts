import {
  AUTH_REFRESH_TOKEN,
  AUTH_TOKEN,
  expireCookies,
  getAuthCookie,
  removeCookies,
  setAuthCookie,
} from "@/lib/cookies";
import { authApi } from "@/lib/features/authSlice/authApiSlice";
import { RootState } from "@/lib/store";
import { LoginResponseType } from "@/types/types";
import {
  PayloadAction,
  // PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

const initialState: Partial<LoginResponseType> = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setCredentials: (state, action: PayloadAction<LoginResStateType>) => {
    //   const { userName } = action.payload;
    //   state.userName = userName;
    // },
    logOut: () => {
      removeCookies([AUTH_TOKEN, AUTH_REFRESH_TOKEN]);
      return initialState;
    },
    expireToken: (state, action: PayloadAction<string[]>) => {
      expireCookies(action.payload);
      const token = getAuthCookie(AUTH_TOKEN);
      const refreshToken = getAuthCookie(AUTH_REFRESH_TOKEN);

      state.token = token;
      state.refreshToken = refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          setAuthCookie(payload.token, "auth_token");
          setAuthCookie(payload.refreshToken, "auth_token");
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

export const {
  logOut,
  // setCredentials
} = authSlice.actions;

export default authSlice.reducer;
