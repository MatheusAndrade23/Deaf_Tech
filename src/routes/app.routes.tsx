import { Platform } from 'react-native';
import { useTheme } from 'native-base';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import { House, GearSix, Question } from 'phosphor-react-native';

import { Home } from '@screens/Home';

type AppRoutes = {
  home: undefined;
  settings: undefined;
  help: undefined;
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
        tabBarActiveTintColor: colors.gray.primary,
        tabBarInactiveTintColor: colors.gray.secondary,
        tabBarStyle: {
          backgroundColor: colors.secondaryColor,
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
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
          tabBarIcon: ({ color }) => (
            <House size={iconSize} color={color} weight="bold" />
          ),
        }}
      />

      <Screen
        name="settings"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <GearSix size={iconSize} color={color} weight="bold" />
          ),
        }}
      />

      <Screen
        name="help"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Question size={iconSize} color={color} weight="bold" />
          ),
        }}
      />
    </Navigator>
  );
};
