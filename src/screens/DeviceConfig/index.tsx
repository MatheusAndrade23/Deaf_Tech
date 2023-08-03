// -------------------------------------------------
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
// ------------------------------------------------

import { useEffect, useState } from 'react';
import {
  ScrollView,
  Center,
  Image,
  Text,
  useTheme,
  useToast,
} from 'native-base';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { ErrorModal } from './components/ErrorModal';
import { BluetoothStatusModal } from './components/BluetoothStatusModal';
import { DeviceConnectionModal } from './components/DeviceConnectionModal';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { useBLE } from '@hooks/useBLE';
import { Device, BleError } from 'react-native-ble-plx';

import {
  ArrowRight,
  LockSimple,
  WifiHigh,
  Question,
} from 'phosphor-react-native';

import Logo from '@assets/logo.png';

type FormDataProps = {
  name: string;
  password: string;
};

const networkIndoSchema = yup.object({
  name: yup.string().required('Informe o nome da rede Wifi'),
  password: yup.string().required('Informe a senha da rede Wifi'),
});

export const DeviceConfig = () => {
  const [isBLuetoothModalOpen, setIsBLuetoothModalOpen] = useState(true);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isModalDeviceConnectionOpen, setIsModalDeviceConnectionOpen] =
    useState(false);
  const [bluetoothStatus, setBluetoothStatus] = useState<
    'unknown' | 'on' | 'off'
  >('unknown');
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();
  const toast = useToast();

  const {
    requestPermissions,
    scanForPeripherals,
    connectToDevice,
    allDevices,
    checkBluetoothStatus,
    writeDataToCharacteristic,
    error,
  } = useBLE();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: '',
      password: '',
    },
    resolver: yupResolver(networkIndoSchema),
  });

  const handleErrorOnConnectingToDevice = (device: Device, error: unknown) => {
    setIsErrorModalVisible(true);
    setIsModalDeviceConnectionOpen(false);
    setIsBLuetoothModalOpen(false);

    const isBleError = error instanceof BleError;

    const title = isBleError
      ? error.message
      : 'Erro ao conectar com o dispositivo.';

    toast.show({
      title,
      placement: 'top',
      bgColor: 'red.middle',
    });
  };

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();

    if (!isPermissionsEnabled) {
      return;
    }

    scanForPeripherals();
    setIsModalDeviceConnectionOpen(true);
    setIsBLuetoothModalOpen(false);
  };

  const handleSendNetworkInfoToDevice = async (networkInfo: FormDataProps) => {
    const data = `["${networkInfo.name}", "${networkInfo.password}"]`;

    try {
      await writeDataToCharacteristic(data);

      const title = 'Enviado com sucesso!';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'green.light',
      });
    } catch (error) {
      const isBleError = error instanceof BleError;

      const title = isBleError
        ? error.message
        : 'Erro ao enviar as informações para a central.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.middle',
      });
    }
  };

  const handleTryConnectAgain = () => {
    setIsBLuetoothModalOpen(true);
    setIsErrorModalVisible(false);
    scanForDevices();
  };

  const hideDeviceConnectionModal = () => {
    setIsModalDeviceConnectionOpen(false);
  };

  useEffect(() => {
    if (error) {
      setIsBLuetoothModalOpen(false);
      setIsModalDeviceConnectionOpen(false);
      setIsErrorModalVisible(true);
      console.log(error);

      const title = error.message
        ? error.message
        : 'Erro ao escanear dispositivos';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.middle',
      });
    }
  }, [error]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const isBluetoothEnabled = await checkBluetoothStatus();

      if (isBluetoothEnabled) {
        setBluetoothStatus('on');
        clearInterval(interval);
        scanForDevices();
      } else {
        setBluetoothStatus('off');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ScrollView>
        <Center flex={1} px="8">
          <Image source={Logo} alt="Logotipo" mt="20%" maxWidth={200} />
          <Text
            color="secondaryColor"
            fontFamily="heading"
            fontSize="md"
            my="4"
          >
            Configuração inicial
          </Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Informe o nome da rede Wifi' }}
            render={({ field: { onChange, value } }) => (
              <Input
                title="Nome da rede Wifi:"
                placeholder="Digite o nome do Wifi"
                icon={<WifiHigh color={colors.gray.tertiary} />}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
                autoCapitalize="none"
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Informe a senha da rede Wifi' }}
            render={({ field: { onChange, value } }) => (
              <Input
                title="Senha da rede Wifi:"
                placeholder="Digite a senha do Wifi"
                secureTextEntry
                icon={<LockSimple color={colors.gray.tertiary} />}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button
            text="Conectar central"
            mt="4"
            icon={<ArrowRight color={colors.secondaryColor} weight="bold" />}
            onPress={handleSubmit(handleSendNetworkInfoToDevice)}
            isLoading={isLoading}
          />
          <Button
            text="Ajuda"
            mt="4"
            variant="secondary"
            icon={<Question color={colors.gray.tertiary} weight="bold" />}
          />
        </Center>
      </ScrollView>
      <BluetoothStatusModal
        bluetoothStatus={bluetoothStatus}
        isModalOpen={isBLuetoothModalOpen}
      />
      <DeviceConnectionModal
        isModalOpen={isModalDeviceConnectionOpen}
        devices={allDevices}
        connectToPeripheral={connectToDevice}
        closeModal={hideDeviceConnectionModal}
        errorFunction={handleErrorOnConnectingToDevice}
      />
      <ErrorModal
        isErrorModalVisible={isErrorModalVisible}
        connectToDevice={handleTryConnectAgain}
      />
    </>
  );
};
