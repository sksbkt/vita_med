import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/lib/features/themeSlice";
import localeReducer from "@/lib/features/localeSlice";
import authSliceReducer from "@/lib/features/authSlice/authSlice";
import { authApi } from "@/lib/features/authSlice/authApiSlice";
export const store = configureStore({
  reducer: {
    themeSlice: themeReducer,
    localeSlice: localeReducer,
    authSlice: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(authApi.middleware),
  devTools: process.env.NODE_ENV != "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
