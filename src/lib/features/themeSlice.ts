import {
  getSettingsFromStorage,
  setSettingsInStorage,
} from "@/helpers/localStorage";
import { RootState } from "@/lib/store";
import { themeInitialLocalStorageKey } from "@/locale/strings";
import { ThemeStateType } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ThemeStateType = {
  darkMode: true,
  ltrMode: true,
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState:
    (getSettingsFromStorage(themeInitialLocalStorageKey) as ThemeStateType) ||
    initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeStateType>) => {
      const { darkMode, ltrMode } = action.payload;

      state.darkMode = darkMode;
      state.ltrMode = ltrMode;
      setSettingsInStorage(themeInitialLocalStorageKey, action.payload);
    },
  },
});

export const getThemeState = (state: RootState) => state.themeSlice;
export const { setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
