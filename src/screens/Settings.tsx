import { useState } from 'react';

import {
  ScrollView,
  VStack,
  HStack,
  useTheme as nativeUseTheme,
  Center,
  Text,
  Radio,
  Switch,
} from 'native-base';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
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

export const Settings = () => {
  const [config, setConfig] = useState({
    showImage: true,
    showNotifications: true,
    repeatNotifications: true,
  });

  const { themeMode, changeTheme } = useTheme();
  const { colors } = nativeUseTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.navigate('app', { screen: 'home' });
  };

  const handleGoToCentralConfig = () => {
    navigation.navigate('deviceConfig', { reConfig: true });
  };

  const handleToggleConfig = (configName: keyof typeof config) => {
    setConfig((prevState) => ({
      ...prevState,
      [configName]: !prevState[configName],
    }));
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

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
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
                onToggle={() => handleToggleConfig('showNotifications')}
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
            <HStack alignItems="center">
              <Switch
                p={0}
                m={0}
                mr="2"
                size="lg"
                offTrackColor="gray.secondary"
                onTrackColor="primaryColor"
                offThumbColor="secondaryColor"
                isChecked={config.repeatNotifications}
                onToggle={() => handleToggleConfig('repeatNotifications')}
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
            <HStack alignItems="center">
              <Switch
                p={0}
                m={0}
                mr="2"
                size="lg"
                offTrackColor="gray.secondary"
                onTrackColor="primaryColor"
                offThumbColor="secondaryColor"
                isChecked={config.showImage}
                onToggle={() => handleToggleConfig('showImage')}
              />
              <Image color={notificationElementsColor('showImage')} size={30} />
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
    </ScrollView>
  );
};
