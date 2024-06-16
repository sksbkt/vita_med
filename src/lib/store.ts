import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/lib/features/themeSlice";
export const store = configureStore({
  reducer: {
    themeSlice: themeReducer,
  },
  devTools: process.env.NODE_ENV != "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
