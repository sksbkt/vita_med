import { AUTH_TOKEN } from "@/constants/strings";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const getAuthCookie = (name: string) => {
  const cookie = getCookie(name);
  if (!cookie) return undefined;
  return Buffer.from(cookie, "base64").toString("ascii");
};

// ? GET COOKIES
// TODO: we must get token from cookie and add it to the state
export const getValidAuthToken = () => {
  const token = getAuthCookie(AUTH_TOKEN);
  const now = new Date();
  const tokenDate = new Date(token || 0);
  return {
    token: now < tokenDate ? token : undefined,
  };
};

// ? SET COOKIES
export const setAuthCookie = (token: string, name: string) => {
  const toBas64 = Buffer.from(token).toString("base64");
  setCookie(name, toBas64, {
    maxAge: 30 * 24 * 60 * 60,
    //? more security options here
    // sameSite: 'strict',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });
};
//! TODO: cant delete http-only cookie
// ? DELETE COOKIES
export const removeCookies = (cookies: string[]) => {
  cookies.forEach((cookie) => {
    console.log("TRIGGER", cookie);
    deleteCookie(cookie);
  });
};

// ? EXPIRE COOKIES
export const expireCookies = (cookies: string[]) => {};
