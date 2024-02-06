import Cookies from "universal-cookie";

const cookies = new Cookies();

export enum CookieKey {
  Theme = "theme",
}

export const getThemeCookie = (): string => cookies.get(CookieKey.Theme);
export const setThemeCookie = (theme: string) =>
  cookies.set(CookieKey.Theme, theme);
