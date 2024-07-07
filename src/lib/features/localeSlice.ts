import {
  getSettingsFromStorage,
  setSettingsInStorage,
} from "@/helpers/localStorage";
import { RootState } from "@/lib/store";
import { LANG_EN, localeInitialLocalStorageKey } from "@/locale/strings";
import { Lang, Languages } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Lang = {
  lang: Languages.EN,
  dic: LANG_EN,
};

export const localeSlice = createSlice({
  name: "localeSlice",
  initialState:
    getSettingsFromStorage(localeInitialLocalStorageKey) || initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload.lang;
      state.dic = action.payload.dic;

      setSettingsInStorage(state, localeInitialLocalStorageKey);
    },
  },
});

export const getLocaleState = (state: RootState) => state.localeSlice;
export const { setLanguage } = localeSlice.actions;

export default localeSlice.reducer;
