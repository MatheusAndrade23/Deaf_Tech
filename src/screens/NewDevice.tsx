import { LogBox } from 'react-native';
import { useState } from 'react';

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

import uuid from 'react-native-uuid';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { IconButton } from '@components/IconButton';
import { ModuleTypeSelector } from '@components/ModuleTypeSelector';
import { CategoriesSelector } from '@components/CategoriesSelector';
import { ModuleSensitivitySelector } from '@components/ModuleSensitivitySelector';

import { useImage } from '@hooks/useImage';
import { useAuth } from '@hooks/useAuth';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';

import { ArrowLeft, Plus, Pencil, FloppyDisk, X } from 'phosphor-react-native';

import { Category, ModuleType, ModuleSensibility } from '@dtos/ModuleDTO';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type FormDataProps = {
  name: string;
};

const createDeviceSchema = yup.object({
  name: yup.string().required('Informe o nome do dispositivo.'),
});

export const NewDevice = () => {
  const [moduleType, setModuleType] = useState<ModuleType>('Wired');
  const [category, setCategory] = useState<Category>('Kitchen');
  const [loading, setLoading] = useState(false);
  const [moduleSensitivity, setModuleSensitivity] =
    useState<ModuleSensibility>('High');
  const [image, setImage] = useState<{
    name: string;
    type: string;
    uri: string;
  } | null>(null);

  const toast = useToast();
  const { colors } = useTheme();
  const { user } = useAuth();
  const { pickImage } = useImage();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(createDeviceSchema),
  });

  const selectType = (type: ModuleType) => {
    setModuleType(type);
  };

  const selectCategory = (category: Category) => {
    setCategory(category);
  };

  const handleGoBack = () => {
    navigation.navigate('app', { screen: 'home' });
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handlePickImage = async () => {
    setLoading(true);
    const image = await pickImage();
    setLoading(false);

    if (image) {
      setImage(image);

      toast.show({
        title: 'Foto selecionada!',
        placement: 'top',
        bgColor: 'green.light',
      });
    }
  };

  const handleCreateModule = async (data: FormDataProps) => {
    // if (!image) {
    //   toast.show({
    //     title: 'Selecione uma imagem!',
    //     placement: 'top',
    //     bgColor: 'red.light',
    //   });
    //   return;
    // }
    setLoading(true);

    const generateId = uuid.v4();
    const id = generateId.replace(/\D/g, '').slice(0, 6);

    try {
      await api.post(`/api/device/create/`, {
        email: user.email,
        deviceId: id,
        device: {
          id,
          name: data.name,
          type: moduleType,
          category,
          sensitivity: moduleSensitivity,
        },
        image,
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

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {loading && (
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
              Novo Dispositivo
            </Text>
          </Center>
        </HStack>

        <VStack mt="8" alignItems="flex-start">
          <Text fontFamily="heading" color="secondaryColor" fontSize="md">
            Imagem:
          </Text>
          <Center position="relative" mt="4" h="32" w="32">
            {image ? (
              <>
                <Image
                  source={{ uri: image.uri }}
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
            category={category}
          />
        </VStack>

        <VStack mt="4">
          <Text
            fontFamily="heading"
            color="secondaryColor"
            fontSize="md"
            mb="4"
          >
            Tipo:
          </Text>

          <ModuleTypeSelector
            selectType={selectType}
            selectedType={moduleType}
            name="ModuleTypeRadioGroup"
            defaultValue="Wired"
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
            selectedSensitivity={moduleSensitivity}
            selectSensitivity={setModuleSensitivity}
          />
        </VStack>
      </VStack>

      <VStack p="4">
        <Button
          text="Criar"
          variant="secondary"
          icon={<FloppyDisk color={colors.gray.tertiary} />}
          onPress={handleSubmit(handleCreateModule)}
        />
        <Button
          text="Cancelar"
          mt="2"
          variant="tertiary"
          icon={<X color={colors.secondaryColor} />}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
};

LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
]);
