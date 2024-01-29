// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    [
      /^c-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] };
      },
    ],
  ],
  theme: {
    colors: {
      alert: "#ED2B2A",
      confirm: "#03C988",
      primary: "#E16428",
      secondary: "#5FBDFF",
      text: {
        asPrimary: "#FFFFFF",
        asSecondary: "#A9A9A9",
        asInverse: {
          "01": "#6A6A6A",
          "02": "#5FBDFF",
        },
      },
      bg: {
        asPrimary: "#212529",
        asSecondary: "#1c1c1c",
        asInverse: {
          "01": "#6A6A6A",
          "02": "#FFFFFF",
        },
        asMask: "#0000004d",
      },
      line: "#D9D9D9",
    },
    breakpoints: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
});
