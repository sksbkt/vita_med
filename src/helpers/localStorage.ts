import { initialLocalStorageKey } from "@/locale/strings";
import { ThemeStateType } from "@/types/types";

export function getThemeSettingsFromStorage<T>(key: string): T | null {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return null;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function setThemeSettingsFromStorage<T>(state: T) {
  localStorage.setItem(initialLocalStorageKey, JSON.stringify(state));
}
