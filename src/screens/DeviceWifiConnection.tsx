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
import { Loading } from '@components/Loading';

import { ErrorModal } from '@components/ErrorModal';
import { BluetoothStatusModal } from '@components/BluetoothStatusModal';
import { DeviceConnectionModal } from '@components/DeviceConnectionModal';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { useBLE } from '@hooks/useBLE';
import { Device, BleError } from 'react-native-ble-plx';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { useAuth } from '@hooks/useAuth';

import {
  ArrowRight,
  LockSimple,
  WifiHigh,
  Question,
  Eye,
  EyeSlash,
  ArrowLeft,
} from 'phosphor-react-native';

import Logo from '@assets/logo.png';

type FormDataProps = {
  name: string;
  password: string;
};

const networkInfoSchema = yup.object({
  name: yup.string().required('Informe o nome da rede Wifi'),
  password: yup.string().required('Informe a senha da rede Wifi'),
});

export const DeviceWifiConnection = () => {
  const [isBLuetoothModalOpen, setIsBLuetoothModalOpen] = useState(true);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [isModalDeviceConnectionOpen, setIsModalDeviceConnectionOpen] =
    useState(false);
  const [bluetoothStatus, setBluetoothStatus] = useState<
    'unknown' | 'on' | 'off'
  >('unknown');

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { user } = useAuth();
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const {
    requestPermissions,
    scanForPeripherals,
    connectToDevice,
    allDevices,
    checkBluetoothStatus,
    writeDataToCharacteristic,
    error,
    stopScan,
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
    resolver: yupResolver(networkInfoSchema),
  });

  const navigateToHome = () => {
    navigation.navigate('app', { screen: 'home' });
  };

  const handleErrorOnConnectingToDevice = (error: unknown) => {
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
    setIsButtonLoading(true);
    const networkName = networkInfo.name;
    const networkPassword = networkInfo.password;
    // const data = `["${networkInfo.name}", "${networkInfo.password}"]`;

    try {
      await writeDataToCharacteristic(networkName);
      await writeDataToCharacteristic(networkPassword);

      const title = 'Enviado com sucesso!';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'green.light',
      });

      navigateToHome();
      // checkIfDeviceConnectedToNetwork();
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

  const checkIfDeviceConnectedToNetwork = async () => {
    setTimeout(async () => {
      try {
        const { data } = await api.get(`/api/connection/${user.email}/false`);
        if (data.connected) {
          navigateToHome();
          setIsBLuetoothModalOpen(false);

          toast.show({
            title: 'Conectado com sucesso!',
            placement: 'top',
            bgColor: 'green.light',
          });
        } else {
          const title = 'Algo deu errado! Por favor, tente novamente!';

          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.middle',
          });

          handleTryConnectAgain();
        }
        setIsButtonLoading(false);
      } catch (error) {
        const isAppError = error instanceof AppError;
        console.log(error);
        const title = isAppError
          ? error.message
          : 'Algo deu errado! Tentando novamente...';

        if (isAppError) {
          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.middle',
          });
        }
        checkIfDeviceConnectedToNetwork();
      }
    }, 10000);
  };

  const handleTryConnectAgain = () => {
    setIsBLuetoothModalOpen(true);
    setIsErrorModalVisible(false);
    scanForDevices();
  };

  const hideDeviceConnectionModal = () => {
    setIsModalDeviceConnectionOpen(false);
  };

  // useEffect(() => {
  //   checkIfDeviceConnectedToNetwork();
  // }, []);

  useEffect(() => {
    // const checkDeviceConnection = async () => {
    //   try {
    //     setIsLoading(true);
    //     const { data } = await api.get(`/api/connection/${user.email}/false`);

    //     if (data.connected) {
    //       navigateToHome();
    //       setIsBLuetoothModalOpen(false);
    //     } else {
    //       setIsLoading(false);
    //     }
    //   } catch (error) {
    //     const isAppError = error instanceof AppError;

    //     const title = isAppError
    //       ? error.message
    //       : 'Algo deu errado! Tentando novamente...';

    //     if (isAppError) {
    //       toast.show({
    //         title,
    //         placement: 'top',
    //         bgColor: 'red.middle',
    //       });
    //     }
    //     checkDeviceConnection();
    //   }
    // };

    // if (!params?.reConfig) {
    //   checkDeviceConnection();
    // } else {
    //   setIsLoading(false);
    //   setIsBLuetoothModalOpen(true);
    // }

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

    return () => {
      clearInterval(interval);
      stopScan();
    };
  }, []);

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

  return (
    <>
      {isLoading ? (
        <Center flex={1}>
          <Loading />
        </Center>
      ) : (
        <>
          <ScrollView>
            <Center flex={1} px="8">
              <Image source={Logo} alt="Logotipo" mt="20%" />
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
                    secureTextEntry={hidePassword}
                    icon={<LockSimple color={colors.gray.tertiary} />}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <Button
                text={hidePassword ? 'Mostrar senha' : 'Esconder senha'}
                mt="4"
                icon={
                  hidePassword ? (
                    <Eye color={colors.secondaryColor} weight="bold" />
                  ) : (
                    <EyeSlash color={colors.secondaryColor} weight="bold" />
                  )
                }
                variant={'tertiary'}
                onPress={() => setHidePassword((prevState) => !prevState)}
              />
              <Button
                text="Ajuda"
                mt="4"
                variant="secondary"
                icon={<Question color={colors.gray.tertiary} weight="bold" />}
              />
              <Button
                text="Conectar central"
                mt="16"
                icon={
                  <ArrowRight color={colors.secondaryColor} weight="bold" />
                }
                onPress={handleSubmit(handleSendNetworkInfoToDevice)}
                isLoading={isButtonLoading}
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
      )}
    </>
  );
};
