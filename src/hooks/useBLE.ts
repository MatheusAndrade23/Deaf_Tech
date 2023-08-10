import { useMemo, useState } from 'react';
import { PermissionsAndroid, Platform, Linking } from 'react-native';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from 'react-native-ble-plx';

import base64 from 'react-native-base64';

import * as ExpoDevice from 'expo-device';

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  checkBluetoothStatus(): Promise<boolean>;
  error: BleError | null;
  writeDataToCharacteristic(data: string): Promise<void>;
}

export const useBLE = (): BluetoothLowEnergyApi => {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [error, setError] = useState<BleError | null>(null);

  const checkBluetoothStatus = async (): Promise<boolean> => {
    try {
      const state = await bleManager.state();
      return state === 'PoweredOn';
    } catch (e) {
      console.error('Error checking Bluetooth state:', e);
      return false;
    }
  };

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Permissão de Localização',
        message: 'Bluetooth requer a acesso à localização',
        buttonPositive: 'OK',
      },
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Permissão de Localização',
        message: 'Bluetooth requer a acesso à localização',
        buttonPositive: 'OK',
      },
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de Localização',
        message: 'Bluetooth requer a acesso à localização',
        buttonPositive: 'OK',
      },
    );

    return (
      bluetoothScanPermission === 'granted' &&
      bluetoothConnectPermission === 'granted' &&
      fineLocationPermission === 'granted'
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Localização',
            message: 'Bluetooth requer a acesso à localização',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = async () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        setError(error);
      }
      if (device && device.name) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

  const connectToDevice = async (device: Device) => {
    const deviceConnection = await bleManager.connectToDevice(device.id);
    setConnectedDevice(deviceConnection);
    await deviceConnection.discoverAllServicesAndCharacteristics();
    bleManager.stopDeviceScan();
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
    }
  };

  const writeDataToCharacteristic = async (data: string) => {
    const encodedData = base64.encode(data);
    if (connectedDevice) {
      connectedDevice.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        encodedData,
      );
    } else {
      throw new Error('');
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    checkBluetoothStatus,
    writeDataToCharacteristic,
    error,
  };
};
