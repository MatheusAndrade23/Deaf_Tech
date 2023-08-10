import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  VStack,
  HStack,
  Text,
  Center,
  useTheme,
  FlatList,
  useToast,
} from 'native-base';

import { Loading } from '@components/Loading';
import { RoomCard } from '@components/RoomCard';
import { IconButton } from '@components/IconButton';

import { Plus, Placeholder } from 'phosphor-react-native';

import { ModuleDTO } from '@dtos/ModuleDTO';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

export const Home = () => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [devices, setDevices] = useState<ModuleDTO[]>([]);

  const toast = useToast();

  const loadData = async () => {
    try {
      const { data } = await api.get<ModuleDTO[]>('/api/devices');
      setDevices(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível receber os dispositivos. Tente Novamente!';

      if (isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.middle',
        });
      }
      setDevices([]);
    } finally {
      setIsLoadingData(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

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
      {isLoadingData ? (
        <Center flex={1}>
          <Loading />
        </Center>
      ) : (
        <FlatList
          flex={1}
          mt={8}
          data={devices}
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
      )}
    </VStack>
  );
};
