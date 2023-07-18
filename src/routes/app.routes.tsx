import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { SecondaryAppRoutes } from './secondaryApp.routes';

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

type AppRoutes = {
  app: {
    screen: 'help' | 'home' | 'settings';
  };
};

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="app">
      <Screen name="app" component={SecondaryAppRoutes} />
    </Navigator>
  );
};
