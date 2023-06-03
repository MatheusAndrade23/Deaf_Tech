import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    bg: "#222831",
    blue: {
      light: "#1B98E0",
      secondaryMiddle: "#247BA0",
      middle: "#006494",
      deep: "#222831",
    },
    green: {
      light: "#00ADB5",
    },
    gray: {
      700: "#F7F7F8",
      600: "#EDECEE",
      500: "#D9D8DA",
      400: "#9F9BA1",
      300: "#5F5B62",
      200: "#3E3A40",
      100: "#1A181B",
    },
    lightColor: "#E8F1F2",
  },
  fonts: {
    heading: "Roboto_700Bold",
    body: "Roboto_400Regular",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148,
  },
});
