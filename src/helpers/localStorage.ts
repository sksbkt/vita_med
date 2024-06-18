import { themeInitialLocalStorageKey } from "@/locale/strings";
import { ThemeStateType } from "@/types/types";

export function getSettingsFromStorage<T>(key: string): T | null {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return null;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function setSettingsInStorage<T>(state: T, key: string) {
  localStorage.setItem(key, JSON.stringify(state));
}
