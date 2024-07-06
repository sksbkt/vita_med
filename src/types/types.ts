import { LANG_FA } from "./../locale/strings";
import { LANG_EN } from "@/locale/strings";
import { Role } from "@prisma/client";

export interface ThemeStateType {
  darkMode: boolean;
  ltrMode: boolean;
}

// export interface LocaleStateType {
//   language: Lang;
// }

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

export interface Lang {
  lang: Languages;
  dic: typeof LANG_EN;
}

export interface dictionary {}

export enum Languages {
  EN = "EN",
  FA = "FA",
}
