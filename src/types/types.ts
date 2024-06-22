export interface ThemeStateType {
  darkMode: boolean;
  ltrMode: boolean;
}

export interface LocaleStateType {
  language: string;
}

export interface LoginResStateType {
  token: string;
  userName: string | null;
  id: string;
  isLoggedIn: boolean;
}
