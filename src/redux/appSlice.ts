import { setThemeCookie, getThemeCookie } from "@/util/cookies";
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: { theme: getThemeCookie() || "light", isSideMenuOpen: false },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      setThemeCookie(state.theme);
    },
    toggleSideMenu: (state) => {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
  },
});

export default appSlice.reducer;
export const { toggleTheme, toggleSideMenu } = appSlice.actions;
