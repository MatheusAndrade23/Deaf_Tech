import { StatusBar } from "react-native";
import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";

export const Routes = () => {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.bg;

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.bg}
        translucent
      />

      <Box flex={1} bg="bg">
        <NavigationContainer theme={theme}>
          <AppRoutes />
        </NavigationContainer>
      </Box>
    </>
  );
};
