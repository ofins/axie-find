import { setThemeCookie, getThemeCookie } from "@/util/cookies";
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: { theme: getThemeCookie() || "light" },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      setThemeCookie(state.theme);
    },
  },
});

export default appSlice.reducer;
export const { toggleTheme } = appSlice.actions;
