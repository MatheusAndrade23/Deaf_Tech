import { LogBox } from 'react-native';
import { useState } from 'react';

import {
  ScrollView,
  HStack,
  Center,
  Text,
  useTheme,
  VStack,
} from 'native-base';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { IconButton } from '@components/IconButton';
import { ModuleTypeSelector } from '@components/ModuleTypeSelector';
import { CategoriesSelector } from '@components/CategoriesSelector';
import { ModuleSensitivitySelector } from '@components/ModuleSensitivitySelector';

import { ArrowLeft, Plus, Pencil, FloppyDisk, X } from 'phosphor-react-native';

import { Category, ModuleType, ModuleSensitivity } from '@dtos/ModuleDTO';

export const NewDevice = () => {
  const [category, setCategory] = useState<Category>('Kitchen');
  const [moduleType, setModuleType] = useState<ModuleType>('Wired');
  const [moduleSensitivity, setModuleSensitivity] = useState<
    ModuleSensitivity[]
  >([]);

  const { colors } = useTheme();

  const selectType = (type: ModuleType) => {
    setModuleType(type);
  };

  const selectCategory = (category: Category) => {
    setCategory(category);
  };

  console.log(moduleSensitivity);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} p="4" mt="4">
        <HStack w="full" position="relative" alignItems="center">
          <IconButton
            left="0"
            position="absolute"
            icon={<ArrowLeft color={colors.secondaryColor} size={30} />}
            p={0}
          />
          <Center w="full">
            <Text fontFamily="heading" color="secondaryColor" fontSize="lg">
              Novo Módulo
            </Text>
          </Center>
        </HStack>

        <VStack mt="8" alignItems="flex-start">
          <Text fontFamily="heading" color="secondaryColor" fontSize="md">
            Imagem:
          </Text>

          <IconButton
            mt="4"
            bg="gray.secondary"
            p="10"
            _pressed={{ bg: 'gray.tertiary' }}
            icon={<Plus color={colors.secondaryColor} size={30} />}
          />
        </VStack>

        <VStack mt="8">
          <Text fontFamily="heading" color="secondaryColor" fontSize="md">
            Cômodo:
          </Text>

          <Input
            mt="4"
            placeholder="Cômodo"
            icon={<Pencil color={colors.gray.tertiary} />}
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
        />
        <Button
          text="Cancelar"
          mt="2"
          variant="tertiary"
          icon={<X color={colors.secondaryColor} />}
        />
      </VStack>
    </ScrollView>
  );
};

LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
]);
