import { getCookie, setCookie } from "cookies-next";

const getAuthCookies = (name: string) => {
  const cookie = getCookie(name);
  if (!cookie) return undefined;
  return Buffer.from(cookie, "base64").toString("ascii");
};

// ? GET COOKIES
export const getValidAuthToken = () => {
  const token = getAuthCookies("auth_token");
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
