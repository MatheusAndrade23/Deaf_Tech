import { createContext, ReactNode, useState } from 'react';

import { NativeBaseProvider, extendTheme } from 'native-base';

import { darkTheme, lightTheme, baseTheme } from '@theme/index';

interface ThemeContextType {
  changeTheme: () => void;
  themeMode: string;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState('dark');

  const changeTheme = () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
  };

  const DarkTheme = extendTheme({
    ...darkTheme,
    ...baseTheme,
  });

  const LightTheme = extendTheme({
    ...lightTheme,
    ...baseTheme,
  });

  return (
    <ThemeContext.Provider value={{ changeTheme, themeMode }}>
      <NativeBaseProvider theme={themeMode == 'dark' ? DarkTheme : LightTheme}>
        {children}
      </NativeBaseProvider>
    </ThemeContext.Provider>
  );
};
