import { Platform } from 'react-native';
import { useTheme, Image } from 'native-base';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import { House, GearSix, Question, Alarm } from 'phosphor-react-native';

import { Home } from '@screens/Home';
import { Settings } from '@screens/Settings';
import { Help } from '@screens/Help';
import { AlarmClock } from '@screens/AlarmClock';

import LibrasLogo from '@assets/libras.svg';

type SecondaryAppRoutes = {
  home: undefined;
  settings: undefined;
  help: undefined;
  alarm: undefined;
};

export type AppNavigatorRoutesProps =
  BottomTabNavigationProp<SecondaryAppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<SecondaryAppRoutes>();

export const SecondaryAppRoutes = () => {
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
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <GearSix size={iconSize} color={color} weight="bold" />
          ),
        }}
      />

      <Screen
        name="alarm"
        component={AlarmClock}
        options={{
          tabBarIcon: ({ color }) => (
            <Alarm size={iconSize} color={color} weight="bold" />
            // <Question size={iconSize} color={color} weight="bold" />
          ),
        }}
      />

      <Screen
        name="help"
        component={Help}
        options={{
          tabBarIcon: ({ color }) => (
            <LibrasLogo fill={color} width={60} height={60} />
            // <Question size={iconSize} color={color} weight="bold" />
          ),
        }}
      />
    </Navigator>
  );
};
