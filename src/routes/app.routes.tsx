import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { DeviceConfig } from '@screens/DeviceConfig';
import { NewDevice } from '@screens/NewDevice';

import { SecondaryAppRoutes } from './secondaryApp.routes';

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

type AppRoutes = {
  deviceConfig: undefined;
  newDevice: undefined;
  app: {
    screen: 'help' | 'home' | 'settings';
  };
};

export const AppRoutes = () => {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="newDevice"
    >
      <Screen name="newDevice" component={NewDevice} />
      <Screen name="app" component={SecondaryAppRoutes} />
      <Screen name="deviceConfig" component={DeviceConfig} />
    </Navigator>
  );
};
