import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { Device } from '@screens/Device';
import { NewDevice } from '@screens/NewDevice';
import { EditDevice } from '@screens/EditDevice';
import { NewAlarmClock } from '@screens/NewAlarmClock';
import { EditAlarmClock } from '@screens/EditAlarmClock';
import { DeviceWifiConnection } from '@screens/DeviceWifiConnection';

import { SecondaryAppRoutes } from './secondaryApp.routes';

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

type AppRoutes = {
  deviceWifiConnection: undefined;
  newDevice: undefined;
  newAlarmClock: undefined;
  editAlarmClock: {
    id: string;
  };
  app: {
    screen: 'help' | 'home' | 'settings' | 'alarm';
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
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="app">
      <Screen name="device" component={Device} />
      <Screen name="newDevice" component={NewDevice} />
      <Screen name="editDevice" component={EditDevice} />
      <Screen name="app" component={SecondaryAppRoutes} />
      <Screen name="editAlarmClock" component={EditAlarmClock} />
      <Screen name="deviceWifiConnection" component={DeviceWifiConnection} />
      <Screen name="newAlarmClock" component={NewAlarmClock} />
    </Navigator>
  );
};
