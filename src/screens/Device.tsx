import { useState, useCallback } from 'react';
import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import {
  ScrollView,
  VStack,
  Center,
  Text,
  useTheme,
  HStack,
  useToast,
  Image,
  Box,
} from 'native-base';

import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { IconButton } from '@components/IconButton';
import { CategoryAndTypeIcon } from '@components/CategoryAndTypeIcon';
import { BatteryLevelIndicator } from '@components/BatteryLevelIndicator';

import { useAuth } from '@hooks/useAuth';

import {
  ArrowLeft,
  PencilSimpleLine,
  TrashSimple,
  Power,
} from 'phosphor-react-native';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { ModuleDTO, Category } from '@dtos/ModuleDTO';

type RouteParams = {
  id: string;
};

export const Device = () => {
  const [device, setDevice] = useState<ModuleDTO>({} as ModuleDTO);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { id } = route.params as RouteParams;

  const toast = useToast();
  const { user } = useAuth();
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.navigate('app', { screen: 'home' });
  };

  const handleEditDevice = () => {
    navigation.navigate('editDevice', { id });
  };

  const handleToggleModuleState = async () => {
    setToggleLoading(true);
    try {
      await api.patch(`/api/devices/toggle`, {
        email: user.email,
        id,
      });

      setDevice((prevState) => ({
        ...prevState,
        active: !prevState.active,
      }));
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
    } finally {
      setToggleLoading(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/device/${user.email}/${id}`);
      setDevice(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível receber o dispositivo. Tente Novamente!';

      if (isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.middle',
        });
      }
      setDevice({} as ModuleDTO);
    } finally {
      setLoading(false);
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
      {loading ? (
        <Center flex={1}>
          <Loading />
        </Center>
      ) : (
        <>
          {toggleLoading && (
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
          <VStack flex={1} mt="4" py="4">
            <HStack
              w="full"
              alignItems="center"
              px="4"
              justifyContent="space-between"
            >
              <IconButton
                icon={<ArrowLeft color={colors.secondaryColor} size={30} />}
                onPress={handleGoBack}
              />
              <IconButton
                icon={
                  <PencilSimpleLine color={colors.secondaryColor} size={30} />
                }
                onPress={handleEditDevice}
              />
            </HStack>

            <Box
              position="relative"
              alignItems="center"
              justifyContent="center"
            >
              {!device.active && (
                <Text
                  flex={1}
                  textTransform="uppercase"
                  color="secondaryColor"
                  fontSize="lg"
                  fontFamily="heading"
                  position="absolute"
                  zIndex={100}
                  bg="bgColor"
                  p={1}
                  w={260}
                  textAlign="center"
                  borderRadius={10}
                >
                  Dispositivo Desativado
                </Text>
              )}
              <Image
                mt="4"
                blurRadius={device.active ? 0 : 10}
                w="full"
                h={80}
                source={{ uri: device.image }}
                alt="DeviceImage"
                resizeMode="cover"
                borderColor={
                  device.active ? colors.secondaryColor : colors.red.middle
                }
                borderWidth={1}
              />
            </Box>

            <VStack px="4">
              <HStack
                justifyContent="space-between"
                alignItems="flex-start"
                mt="8"
              >
                <VStack>
                  <Text
                    fontFamily="heading"
                    color="secondaryColor"
                    fontSize="xl"
                  >
                    {device.name}
                  </Text>
                  <HStack alignItems="center" mt="4">
                    <Text
                      fontFamily="heading"
                      color="secondaryColor"
                      fontSize="md"
                    >
                      Tipo:{' '}
                    </Text>

                    <Text
                      fontFamily="body"
                      color="primaryColor"
                      textDecorationLine="underline"
                      fontSize="md"
                    >
                      {device.type === 'Wired' ? 'Com fio' : 'Sem fio'}
                    </Text>
                  </HStack>
                  <HStack alignItems="center" mt="2">
                    <Text
                      fontFamily="heading"
                      color="secondaryColor"
                      fontSize="md"
                    >
                      Categoria:{' '}
                    </Text>

                    <Text
                      fontFamily="body"
                      color="primaryColor"
                      textDecorationLine="underline"
                      fontSize="md"
                    >
                      {returnDeviceCategory(device.category)}
                    </Text>
                  </HStack>
                </VStack>
                <VStack>
                  <HStack>
                    <CategoryAndTypeIcon
                      mr="2"
                      border
                      category={device.type}
                      color={colors.secondaryColor}
                    />
                    <CategoryAndTypeIcon
                      border
                      category={device.category}
                      color={colors.secondaryColor}
                    />
                  </HStack>
                  {device.type === 'Wireless' && (
                    <BatteryLevelIndicator
                      mt="2"
                      alignSelf="flex-end"
                      batteryLevel={device.batteryLevel}
                    />
                  )}
                </VStack>
              </HStack>
            </VStack>

            <HStack px="4" mt="12" justifyContent="space-between">
              <VStack>
                <Text fontFamily="heading" color="secondaryColor" fontSize="md">
                  Sensibilidade:
                </Text>
              </VStack>
              {device.type === 'Wireless' && (
                <HStack alignItems="center">
                  <Text
                    fontFamily="heading"
                    color="secondaryColor"
                    fontSize="md"
                  >
                    Bateria:{' '}
                  </Text>
                  <Text
                    fontFamily="body"
                    color="primaryColor"
                    textDecorationLine="underline"
                    fontSize="md"
                  >
                    {device.batteryLevel}%
                  </Text>
                </HStack>
              )}
            </HStack>

            <VStack p="4">
              <Button
                text="Excluir"
                variant="tertiary"
                icon={<TrashSimple color={colors.secondaryColor} />}
              />
              <Button
                mt="2"
                text={device.active ? 'Desativar' : 'Ativar'}
                variant="secondary"
                icon={<Power color={colors.gray.tertiary} />}
                onPress={handleToggleModuleState}
              />
            </VStack>
          </VStack>
        </>
      )}
    </ScrollView>
  );
};

const returnDeviceCategory = (category: Category) => {
  switch (category) {
    case 'Bell':
      return 'Campainha';

    case 'Room':
      return 'Quarto';

    case 'ExternalArea':
      return 'Área Externa';

    case 'Garden':
      return 'Jardim';

    case 'Kitchen':
      return 'Cozinha';

    case 'LivingRoom':
      return 'Sala de Estar';

    case 'Toilet':
      return 'Banheiro';
  }
};

const returnSensibilityIcon = (sensibility: number) => {};
