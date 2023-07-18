import { useState } from 'react';
import { VStack, HStack, Text, Center, useTheme, FlatList } from 'native-base';

import { RoomCard } from '@components/RoomCard';
import { IconButton } from '@components/IconButton';

import { Plus, Placeholder } from 'phosphor-react-native';

import { ModuleDTO } from '@dtos/ModuleDTO';

export const Home = () => {
  const [rooms, setRooms] = useState<ModuleDTO[]>([
    {
      id: '1',
      name: 'Quarto',
      category: 'Room',
      batteryLevel: 30,
      active: true,
    },
    {
      id: '2',
      name: 'Banheiro',
      category: 'Toilet',
      batteryLevel: 20,
      active: false,
    },
    {
      id: '3',
      name: 'Jardim',
      category: 'Garden',
      batteryLevel: 100,
      active: true,
    },
  ]);

  const { colors } = useTheme();
  return (
    <VStack flex={1} p="4" mt="4">
      <HStack w="full" position="relative">
        <Center w="full">
          <Text fontFamily="heading" color="secondaryColor" fontSize="lg">
            Cômodos
          </Text>
        </Center>
        <IconButton
          right="0"
          position="absolute"
          icon={<Plus color={colors.secondaryColor} size={30} />}
        />
      </HStack>
      <FlatList
        flex={1}
        mt={8}
        data={rooms}
        zIndex={300}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flex: 1 }}
        renderItem={({ item }) => <RoomCard maxH="16" mb="2" {...item} />}
        ListEmptyComponent={() => (
          <Center h="full">
            <Placeholder
              color={colors.gray.quaternary}
              size={90}
              weight="thin"
            />
            <Text fontFamily="heading" color="gray.quaternary">
              Nenhum módulo cadastrado!
            </Text>
            <Text fontFamily="heading" color="gray.quaternary">
              Clique em "+" para adicionar um novo módulo.
            </Text>
          </Center>
        )}
      />
    </VStack>
  );
};
