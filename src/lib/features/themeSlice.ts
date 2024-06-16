import { RootState } from "@/lib/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface ThemeState {
  darkMode: boolean;
  ltrMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false,
  ltrMode: true,
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeState>) => {
      state.darkMode = action.payload.darkMode;
      state.ltrMode = action.payload.ltrMode;
    },
  },
});

export const getThemeState = (state: RootState) => state.themeSlice;
export const { setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
