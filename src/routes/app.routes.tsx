import { Platform } from "react-native";
import { useTheme } from "native-base";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { House } from "phosphor-react-native";

import { Home } from "@screens/Home";

type AppRoutes = {
  home: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export const AppRoutes = () => {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[8];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.blue.light,
        tabBarInactiveTintColor: colors.blue.deep,
        tabBarStyle: {
          backgroundColor: colors.lightColor,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[8],
          paddingTop: sizes[8],
        },
      }}
      initialRouteName="home"
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House size={iconSize} color={color} />,
        }}
      />
    </Navigator>
  );
};
