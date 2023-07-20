import { useState } from 'react';
import { ScrollView, Center, Image, Text, useTheme, Modal } from 'native-base';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import {
  ArrowRight,
  LockSimple,
  WifiHigh,
  Question,
  BluetoothX,
  Bluetooth,
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
  const [isBTOFFModalVisible, setBTOFFModalVisible] = useState(false);
  const [isBTONModalVisible, setBTONModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();

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

  const handleConnectDeviceToNetwork = async (data: FormDataProps) => {
    console.log(data);
  };

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
            onPress={handleSubmit(handleConnectDeviceToNetwork)}
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
      <Modal
        isOpen={isBTOFFModalVisible}
        bgColor="secondaryColor"
        h="40%"
        marginBottom={0}
        marginTop="auto"
        borderTopLeftRadius="8"
        borderTopRightRadius="8"
        size="xl"
      >
        <Modal.Content h="full" w="full">
          <Modal.Body>
            <Center>
              <BluetoothX color={colors.red.middle} size={180} weight="thin" />
              <Text fontFamily="heading" color={colors.red.middle}>
                Bluetooth desligado
              </Text>
              <Text fontFamily="heading" mt="8" fontSize="md">
                Por favor, ative o bluetooth do dispositivo
              </Text>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={isBTONModalVisible}
        bgColor="secondaryColor"
        h="40%"
        marginBottom={0}
        marginTop="auto"
        borderTopLeftRadius="8"
        borderTopRightRadius="8"
        size="xl"
      >
        <Modal.Content h="full" w="full">
          <Modal.Body>
            <Center>
              <Bluetooth color={colors.primaryColor} size={180} weight="thin" />
              <Text fontFamily="heading" color={colors.primaryColor}>
                Bluetooth ligado
              </Text>
              <Text fontFamily="heading" mt="8" fontSize="md">
                Conectando...
              </Text>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
