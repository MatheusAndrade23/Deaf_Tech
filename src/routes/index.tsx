import { StatusBar } from 'react-native';
import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export const Routes = () => {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.bgColor;

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.bgColor}
        translucent
      />

      <Box flex={1} bg="bgColor">
        <NavigationContainer theme={theme}>
          <AuthRoutes />
        </NavigationContainer>
      </Box>
    </>
  );
};
