import {
  ScrollView,
  HStack,
  Center,
  Text,
  IconButton,
  useTheme,
  VStack,
} from 'native-base';

import { Input } from '@components/Input';

import { ArrowLeft, Plus, Pencil } from 'phosphor-react-native';

export const NewDevice = () => {
  const { colors } = useTheme();

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

        <VStack mt="8" alignItems="flex-start">
          <Text fontFamily="heading" color="secondaryColor" fontSize="md">
            Cômodo:
          </Text>

          <Input
            mt="4"
            placeholder="Cômodo"
            icon={<Pencil color={colors.gray.tertiary} />}
          />
        </VStack>

        <VStack mt="4" alignItems="flex-start">
          <Text fontFamily="heading" color="secondaryColor" fontSize="md">
            Categoria:
          </Text>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
