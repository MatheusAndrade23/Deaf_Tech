import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { Device } from '@screens/Device';
import { NewDevice } from '@screens/NewDevice';
import { DeviceConfig } from '@screens/DeviceConfig';
import { EditDevice } from '@screens/EditDevice';

import { SecondaryAppRoutes } from './secondaryApp.routes';

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

type AppRoutes = {
  deviceConfig: {
    reConfig: true | undefined;
  };
  newDevice: undefined;
  app: {
    screen: 'help' | 'home' | 'settings';
  };
  device: {
    id: string;
  };
  editDevice: {
    id: string;
  };
};

export const AppRoutes = () => {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="deviceConfig"
    >
      <Screen name="device" component={Device} />
      <Screen name="newDevice" component={NewDevice} />
      <Screen name="editDevice" component={EditDevice} />
      <Screen name="app" component={SecondaryAppRoutes} />
      <Screen name="deviceConfig" component={DeviceConfig} />
    </Navigator>
  );
};
