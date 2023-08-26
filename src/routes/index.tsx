import { StatusBar } from 'react-native';
import { useTheme as useNativeTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

import { useTheme } from '@hooks/useTheme';

export const Routes = () => {
  const { themeMode } = useTheme();
  const { colors } = useNativeTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.bgColor;

  return (
    <>
      <StatusBar
        barStyle={themeMode === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.bgColor}
        translucent
      />

      <Box flex={1} bg="bgColor">
        <NavigationContainer theme={theme}>
          <AppRoutes />
        </NavigationContainer>
      </Box>
    </>
  );
};
