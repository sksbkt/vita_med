import {
  getSettingsFromStorage,
  setSettingsInStorage,
} from "@/helpers/localStorage";
import { RootState } from "@/lib/store";
import { localeInitialLocalStorageKey } from "@/locale/strings";
import { LocaleStateType } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: LocaleStateType = {
  language: "en",
};

export const localeSlice = createSlice({
  name: "localeSlice",
  initialState:
    getSettingsFromStorage(localeInitialLocalStorageKey) || initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LocaleStateType>) => {
      state.language = action.payload.language;
      setSettingsInStorage(state, localeInitialLocalStorageKey);
    },
  },
});

export const getLocaleState = (state: RootState) => state.localeSlice;
export const { setLanguage } = localeSlice.actions;

export default localeSlice.reducer;
