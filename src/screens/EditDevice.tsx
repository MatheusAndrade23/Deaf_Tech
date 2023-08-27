import { LogBox } from 'react-native';
import { useState, useCallback } from 'react';

import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from '@react-navigation/native';

import {
  ScrollView,
  HStack,
  Center,
  Text,
  useTheme,
  VStack,
  Image,
  useToast,
  Box,
} from 'native-base';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { IconButton } from '@components/IconButton';
import { CategoriesSelector } from '@components/CategoriesSelector';
import { ModuleSensitivitySelector } from '@components/ModuleSensitivitySelector';

import { useImage } from '@hooks/useImage';
import { useAuth } from '@hooks/useAuth';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { ArrowLeft, Plus, Pencil, FloppyDisk, X } from 'phosphor-react-native';

import { Category, ModuleDTO, ModuleSensibility } from '@dtos/ModuleDTO';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type RouteParams = {
  id: string;
};

type FormDataProps = {
  name: string;
};

const createDeviceSchema = yup.object({
  name: yup.string().required('Informe o nome do dispositivo.'),
});

export const EditDevice = () => {
  const [device, setDevice] = useState<ModuleDTO>({} as ModuleDTO);
  const [dataLoading, setDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { user } = useAuth();
  const { colors } = useTheme();
  const { pickImage } = useImage();

  const route = useRoute();
  const { id } = route.params as RouteParams;
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    // defaultValues: {
    //   name: device.name,
    // },
    resolver: yupResolver(createDeviceSchema),
  });

  const selectCategory = (category: Category) => {
    setDevice((prevDevice) => ({ ...prevDevice, category }));
  };

  const handleGoBack = () => {
    navigation.navigate('device', { id });
  };

  const handleDeleteImage = () => {
    setDevice((prevDevice) => ({ ...prevDevice, image: '' }));
  };

  const changeModuleSensitive = (sensibility: ModuleSensibility) => {
    setDevice((prevDevice) => ({ ...prevDevice, sensibility }));
  };

  const handlePickImage = async () => {
    setLoading(true);
    const image = await pickImage();
    setLoading(false);

    if (image) {
      setDevice((prevDevice) => ({ ...prevDevice, image: image.uri }));

      toast.show({
        title: 'Foto selecionada!',
        placement: 'top',
        bgColor: 'green.light',
      });
    }
  };

  const handleEditModule = async (formData: FormDataProps) => {
    setLoading(true);
    if (device.image.length === 0) {
      toast.show({
        title: 'Selecione uma imagem!',
        placement: 'top',
        bgColor: 'red.light',
      });
      return;
    }

    const imageData = new FormData();

    const imageFile = {
      uri: device.image,
    } as any;

    imageData.append('image', imageFile);

    try {
      await api.patch(`/api/device/edit/`, {
        email: user.email,
        deviceId: id,
        device: { ...device, name: formData.name },
        image: imageData,
      });

      toast.show({
        title: 'Dispositivo editado com sucesso!',
        placement: 'top',
        bgColor: 'green.light',
      });

      navigation.navigate('device', { id });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível editar o dispositivo. Tente Novamente!';

      if (isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.middle',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
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
      setDataLoading(false);
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
      {dataLoading ? (
        <Center flex={1}>
          <Loading />
        </Center>
      ) : (
        <>
          {loading && (
            <Center
              w="full"
              h="full"
              position="absolute"
              zIndex={2}
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
                  Editar Dispositivo
                </Text>
              </Center>
            </HStack>

            <VStack mt="8" alignItems="flex-start">
              <Text fontFamily="heading" color="secondaryColor" fontSize="md">
                Imagem:
              </Text>
              <Center position="relative" mt="4" h="32" w="32">
                {device.image ? (
                  <>
                    <Image
                      source={{ uri: device.image }}
                      alt="Imagem do Dispositivo"
                      height="full"
                      width="full"
                      resizeMode="contain"
                    />
                    <Box
                      position="absolute"
                      right={1}
                      top={1}
                      bg="rgba(0,0,0,0.5)"
                      borderRadius="full"
                    >
                      <IconButton
                        p="0.5"
                        onPress={handleDeleteImage}
                        icon={<X color={colors.secondaryColor} />}
                      />
                    </Box>
                  </>
                ) : (
                  <IconButton
                    bg="gray.secondary"
                    p="10"
                    height="full"
                    width="full"
                    _pressed={{ bg: 'gray.tertiary' }}
                    icon={<Plus color={colors.secondaryColor} size={30} />}
                    onPress={handlePickImage}
                  />
                )}
              </Center>
            </VStack>

            <VStack mt="8">
              <Text fontFamily="heading" color="secondaryColor" fontSize="md">
                Nome:
              </Text>

              <Controller
                control={control}
                name="name"
                defaultValue={device.name}
                rules={{ required: 'Informe o nome do dispositivo:' }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    mt="4"
                    placeholder="Nome do dispositivo"
                    icon={<Pencil color={colors.gray.tertiary} />}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                    autoCapitalize="none"
                    value={value}
                  />
                )}
              />
            </VStack>

            <VStack mt="4">
              <Text fontFamily="heading" color="secondaryColor" fontSize="md">
                Categoria:
              </Text>

              <CategoriesSelector
                mt="4"
                selectCategory={selectCategory}
                category={device.category}
              />
            </VStack>

            <VStack mt="4">
              <Text
                fontFamily="heading"
                color="secondaryColor"
                fontSize="md"
                mb="4"
              >
                Sensibilidade:
              </Text>

              <ModuleSensitivitySelector
                name="Seletor de Sensibilidade"
                selectedSensitivity={device.sensibility}
                selectSensitivity={changeModuleSensitive}
              />
            </VStack>
          </VStack>

          <VStack p="4">
            <Button
              text="Salvar"
              variant="secondary"
              icon={<FloppyDisk color={colors.gray.tertiary} />}
              onPress={handleSubmit(handleEditModule)}
            />
            <Button
              text="Cancelar"
              mt="2"
              variant="tertiary"
              icon={<X color={colors.secondaryColor} />}
              onPress={handleGoBack}
            />
          </VStack>
        </>
      )}
    </ScrollView>
  );
};

LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
]);
