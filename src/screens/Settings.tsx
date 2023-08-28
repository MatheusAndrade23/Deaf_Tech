import { useState, useCallback } from 'react';

import {
  ScrollView,
  VStack,
  HStack,
  useTheme as nativeUseTheme,
  Center,
  Text,
  Radio,
  Switch,
  useToast,
} from 'native-base';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { IconButton } from '@components/IconButton';

import {
  ArrowLeft,
  Moon,
  Sun,
  Gear,
  Image,
  Repeat,
  Bell,
} from 'phosphor-react-native';

import { useTheme } from '@hooks/useTheme';
import { useAuth } from '@hooks/useAuth';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type ConfigType = {
  showImage: boolean;
  showNotifications: boolean;
  repeatNotifications: boolean;
};

export const Settings = () => {
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [reconfigureCentralLoading, setReconfigureCentralLoading] =
    useState(false);
  const [config, setConfig] = useState({} as ConfigType);

  const { themeMode, changeTheme } = useTheme();
  const { colors } = nativeUseTheme();

  const toast = useToast();
  const { user } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.navigate('app', { screen: 'home' });
  };

  const handleGoToCentralConfig = async () => {
    setReconfigureCentralLoading(true);
    try {
      await api.patch(`/api/reconnection`, {
        email: user.email,
      });

      navigation.navigate('deviceConfig', { reConfig: true });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Algo deu errado. Tente Novamente!';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.middle',
      });
    } finally {
      setReconfigureCentralLoading(false);
    }
  };

  const handleToggleConfig = async (
    configName: keyof typeof config,
    value: boolean,
  ) => {
    setLoadingConfig(true);
    toggleConfig(configName, value);

    if (config[configName] !== value) {
      setConfig((prevState) => ({
        ...prevState,
        [configName]: !prevState[configName],
      }));
    }
  };

  const toggleConfig = async (
    configName: keyof typeof config,
    value: boolean,
  ) => {
    try {
      await api.patch(`/api/configuration`, {
        email: user.email,
        configuration: configName,
      });

      toast.show({
        title: 'Configurações alteradas com sucesso!',
        placement: 'top',
        bgColor: 'green.light',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível alterar o estado do dispositivo. Tente Novamente!';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.middle',
      });
      setConfig((prevState) => ({
        ...prevState,
        [configName]: !value,
      }));
    } finally {
      setLoadingConfig(false);
    }
  };

  const notificationElementsColor = (configName: keyof typeof config) => {
    if (config[configName]) {
      return colors.primaryColor;
    } else {
      return colors.secondaryColor;
    }
  };

  const themeElementsColor = (mode: 'light' | 'dark') => {
    if (mode === themeMode) {
      return colors.primaryColor;
    } else {
      return colors.secondaryColor;
    }
  };

  const loadData = async () => {
    setLoadingData(true);
    try {
      const { data } = await api.get(`/api/configuration/${user.email}`);
      setConfig(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível receber as configurações. Tente Novamente!';

      if (isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.middle',
        });
      }
    } finally {
      setLoadingData(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {loadingData ? (
        <Center flex={1}>
          <Loading />
        </Center>
      ) : (
        <>
          {loadingConfig && (
            <Center
              w="full"
              h="full"
              position="absolute"
              zIndex={100}
              bg="rgba(0,0,0,0.5)"
            >
              <Loading />
            </Center>
          )}
          <VStack flex={1} p="4" mt="8">
            <HStack w="full" position="relative" alignItems="center">
              <IconButton
                left="0"
                position="absolute"
                icon={<ArrowLeft color={colors.secondaryColor} size={30} />}
                zIndex={100}
                p={0}
                onPress={handleGoBack}
              />
              <Center w="full">
                <Text fontFamily="heading" color="secondaryColor" fontSize="lg">
                  Configurações
                </Text>
              </Center>
            </HStack>

            <VStack mt="4" w="full">
              <Text
                fontFamily="heading"
                color="secondaryColor"
                fontSize="lg"
                mb="2"
              >
                Conexão
              </Text>

              <Button
                text="Reconectar Central"
                mt="2"
                variant="secondary"
                onPress={handleGoToCentralConfig}
                isLoading={reconfigureCentralLoading}
                icon={<Gear color={colors.gray.tertiary} />}
              />

              <Text
                fontFamily="heading"
                color="secondaryColor"
                fontSize="lg"
                mb="2"
                mt="8"
              >
                Tema
              </Text>

              <Radio.Group
                name="Seletor de Tema"
                defaultValue={themeMode}
                onChange={(nextValue) => {
                  changeTheme(nextValue);
                }}
              >
                <HStack>
                  <Sun color={themeElementsColor('light')} weight="bold" />
                  <Radio value="light" ml="1">
                    <Text
                      fontFamily="body"
                      color={themeElementsColor('light')}
                      fontSize="md"
                    >
                      Claro
                    </Text>
                  </Radio>
                </HStack>

                <HStack mt="2">
                  <Moon color={themeElementsColor('dark')} weight="bold" />
                  <Radio value="dark" ml="1">
                    <Text
                      fontFamily="body"
                      color={themeElementsColor('dark')}
                      fontSize="md"
                    >
                      Escuro
                    </Text>
                  </Radio>
                </HStack>
              </Radio.Group>

              <Text
                fontFamily="heading"
                color="secondaryColor"
                fontSize="lg"
                mb="2"
                mt="8"
              >
                Notificações
              </Text>

              <VStack w="full">
                <HStack alignItems="center">
                  <Switch
                    p={0}
                    m={0}
                    mr="2"
                    size="lg"
                    offTrackColor="gray.secondary"
                    onTrackColor="primaryColor"
                    offThumbColor="secondaryColor"
                    isChecked={config.showNotifications}
                    onToggle={(value) =>
                      handleToggleConfig('showNotifications', value)
                    }
                  />
                  <Bell
                    color={notificationElementsColor('showNotifications')}
                    size={30}
                  />
                  <Text
                    mx="2"
                    fontFamily="body"
                    color={notificationElementsColor('showNotifications')}
                    fontSize="md"
                  >
                    Mostrar Notificações
                  </Text>
                </HStack>
                <HStack alignItems="center" mt="1">
                  <Switch
                    p={0}
                    m={0}
                    mr="2"
                    size="lg"
                    offTrackColor="gray.secondary"
                    onTrackColor="primaryColor"
                    offThumbColor="secondaryColor"
                    isChecked={config.repeatNotifications}
                    onToggle={(value) =>
                      handleToggleConfig('repeatNotifications', value)
                    }
                  />
                  <Repeat
                    color={notificationElementsColor('repeatNotifications')}
                    size={30}
                  />
                  <Text
                    mx="2"
                    fontFamily="body"
                    color={notificationElementsColor('repeatNotifications')}
                    fontSize="md"
                  >
                    Repetir Notificações
                  </Text>
                </HStack>
                <HStack alignItems="center" mt="1">
                  <Switch
                    p={0}
                    m={0}
                    mr="2"
                    size="lg"
                    offTrackColor="gray.secondary"
                    onTrackColor="primaryColor"
                    offThumbColor="secondaryColor"
                    isChecked={config.showImage}
                    onToggle={(value) => handleToggleConfig('showImage', value)}
                  />
                  <Image
                    color={notificationElementsColor('showImage')}
                    size={30}
                  />
                  <Text
                    mx="2"
                    fontFamily="body"
                    color={notificationElementsColor('showImage')}
                    fontSize="md"
                  >
                    Mostrar Imagem
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </>
      )}
    </ScrollView>
  );
};
