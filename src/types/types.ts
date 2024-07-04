import { Role } from "@prisma/client";

export interface ThemeStateType {
  darkMode: boolean;
  ltrMode: boolean;
}

export interface LocaleStateType {
  language: string;
}

export interface LoginResponseType {
  token: string;
  refreshToken: string;
  userName: string | null;
  id: string;
  // isLoggedIn: boolean;
}

export interface RegisterPayload {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: Role;
}
