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

import { BTONModal } from './components/BTONModal';
import { BTOFFModal } from './components/BTOFFModal';
import { ErrorModal } from './components/ErrorModal';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import useBLE from '@hooks/useBLE';

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
  const [isbluetoothON, setIsbluetoothON] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();
  const toast = useToast();
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    checkBluetoothStatus,
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

  var isBTOFFModalVisible = false;
  var isBTONModalVisible = false;

  if (!isbluetoothON && !isErrorModalVisible) {
    isBTONModalVisible = false;
    isBTOFFModalVisible = true;
  } else if (isbluetoothON && !isErrorModalVisible) {
    isBTOFFModalVisible = false;
    isBTONModalVisible = true;
  }

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();

    if (!isPermissionsEnabled) {
      return;
    }

    await scanForPeripherals();

    // if (error) {
    //   console.log(error);
    //   const title = error.message;
    //   setIsErrorModalVisible(true);
    //   toast.show({
    //     title,
    //     placement: 'top',
    //     bgColor: 'red.middle',
    //   });
    // }

    // console.log(error);

    // toast.show({
    //   title: 'Deu certo',
    //   placement: 'top',
    //   bgColor: 'primaryColor',
    // });
  };

  const handleSendNetworkInfoToDevice = async (data: FormDataProps) => {};

  const handleTryConnectAgain = () => {
    setIsErrorModalVisible(false);
    scanForDevices();
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const isBluetoothEnabled = await checkBluetoothStatus();
      setIsbluetoothON(isBluetoothEnabled);

      if (isBluetoothEnabled) {
        clearInterval(interval);
        scanForDevices();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ScrollView>
        <Center flex={1} px="8">
          <Image
            source={Logo}
            alt="Logotipo"
            w="250"
            resizeMode="contain"
            mt="20%"
          />
          <Text
            color="secondaryColor"
            fontFamily="heading"
            fontSize="md"
            mb="4"
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
            text="Conectar"
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
      <BTOFFModal isBTOFFModalVisible={isBTOFFModalVisible} />
      <BTONModal isBTONModalVisible={isBTONModalVisible} />
      <ErrorModal
        isErrorModalVisible={isErrorModalVisible}
        connectToDevice={handleTryConnectAgain}
      />
    </>
  );
};
