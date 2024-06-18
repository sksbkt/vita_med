import {
  getSettingsFromStorage,
  setSettingsInStorage,
} from "@/helpers/localStorage";
import { RootState } from "@/lib/store";
import { themeInitialLocalStorageKey } from "@/locale/strings";
import { ThemeStateType } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ThemeStateType = {
  darkMode: false,
  ltrMode: true,
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState:
    getSettingsFromStorage(themeInitialLocalStorageKey) || initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeStateType>) => {
      state.darkMode = action.payload.darkMode;
      state.ltrMode = action.payload.ltrMode;
      setSettingsInStorage(state, themeInitialLocalStorageKey);
    },
  },
});

export const getThemeState = (state: RootState) => state.themeSlice;
export const { setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
