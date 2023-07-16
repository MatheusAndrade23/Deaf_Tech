import { baseTheme } from '@theme/baseTheme';
import { darkTheme } from '@theme/darkTheme';

const THEME = {
  ...darkTheme,
  ...baseTheme,
};

type CustomThemeType = typeof THEME;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
