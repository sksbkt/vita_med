import {
  getThemeSettingsFromStorage,
  setThemeSettingsFromStorage,
} from "@/helpers/localStorage";
import { RootState } from "@/lib/store";
import { initialLocalStorageKey } from "@/locale/strings";
import { ThemeStateType } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ThemeStateType = {
  darkMode: false,
  ltrMode: true,
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState:
    getThemeSettingsFromStorage(initialLocalStorageKey) || initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeStateType>) => {
      state.darkMode = action.payload.darkMode;
      state.ltrMode = action.payload.ltrMode;
      setThemeSettingsFromStorage(state);
    },
  },
});

export const getThemeState = (state: RootState) => state.themeSlice;
export const { setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
