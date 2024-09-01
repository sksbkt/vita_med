import { AUTH_REFRESH_TOKEN, AUTH_TOKEN } from "@/constants/strings";
import {
  getSettingsFromStorage,
  removeSettingsFromStorage,
  setSettingsInStorage,
} from "@/helpers/localStorage";
import {
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
  initialState:
    ({
      ACCESS_TOKEN: getSettingsFromStorage("ACCESS_TOKEN"),
      userName: getSettingsFromStorage("userName"),
    } as Partial<LoginResponseType>) ?? initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponseType>) => {
      const { userName, id, ACCESS_TOKEN } = action.payload;
      state.userName = userName;
      if (userName) setSettingsInStorage("userName", userName);
      state.ACCESS_TOKEN = ACCESS_TOKEN;
      if (ACCESS_TOKEN) setSettingsInStorage("ACCESS_TOKEN", ACCESS_TOKEN);
    },
    logOut: (state) => {
      console.log("logout");
      removeSettingsFromStorage("userName");
      state.userName = null;
      removeSettingsFromStorage("ACCESS_TOKEN");
      state.ACCESS_TOKEN = null;
      // removeCookies([AUTH_REFRESH_TOKEN, AUTH_TOKEN]);

      return initialState;
    },
    expireToken: (state, action: PayloadAction<string[]>) => {
      expireCookies(action.payload);
      const token = getAuthCookie(AUTH_TOKEN);
      const refreshToken = getAuthCookie(AUTH_REFRESH_TOKEN);

      state.ACCESS_TOKEN = token;
      // state.refreshToken = refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          if (payload.ACCESS_TOKEN)
            setAuthCookie(payload.ACCESS_TOKEN, AUTH_TOKEN);
          // setAuthCookie(payload.refreshToken, AUTH_REFRESH_TOKEN);
          return payload;
        }
      )
      .addMatcher(
        authApi.endpoints.getAuthData.matchFulfilled,
        (_state, { payload }) => {
          if (payload.ACCESS_TOKEN)
            setAuthCookie(payload.ACCESS_TOKEN, AUTH_TOKEN);
          return payload;
        }
      );
  },
});

export const getAuthState = (state: RootState) => state.authSlice;

export const { logOut, setCredentials } = authSlice.actions;

export default authSlice.reducer;
