import { setThemeCookie, getThemeCookie } from "@/util/cookies";
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: getThemeCookie() || "light" },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      setThemeCookie(state.mode);
    },
  },
});

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
