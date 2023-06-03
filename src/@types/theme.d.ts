import { THEME } from "../theme";

type CustomThemeType = typeof THEME;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
