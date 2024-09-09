export function getSettingsFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") {
    // If we're on the server, return a default value or throw an error
    console.error(
      "Attempted to access localStorage in a non-browser environment."
    );
    return null;
  }
  try {
    const serializedState = localStorage.getItem(key);
    console.log(key, serializedState);
    if (serializedState === null) return null;

    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function setSettingsInStorage<T>(key: string, state: T) {
  if (typeof window === "undefined") {
    // If we're on the server, log an error or handle differently
    console.error(
      "Attempted to set localStorage in a non-browser environment."
    );
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
}

export function removeSettingsFromStorage<T>(key: string) {
  if (typeof window === "undefined") {
    // If we're on the server, log an error or handle differently
    console.error(
      "Attempted to set localStorage in a non-browser environment."
    );
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
}
