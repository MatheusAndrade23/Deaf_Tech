import { useState } from 'react';
import { VStack, HStack, Center, Text, useTheme, FlatList } from 'native-base';

import { Plus, Placeholder } from 'phosphor-react-native';

import { AlarmClockDTO } from '@dtos/AlarmClockDTO';

import { Loading } from '@components/Loading';
import { IconButton } from '@components/IconButton';
import { AlarmCard } from '@components/AlarmCard';

export const AlarmClock = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [alarmClocks, setAlarmClocks] = useState<AlarmClockDTO[]>([
    {
      id: '1',
      days: ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
      name: 'Alarme 1',
      active: true,
      time: '08:00',
    },
  ]);
  const { colors } = useTheme();

  return (
    <VStack flex={1} p="4" mt="8" position="relative">
      <HStack w="full" position="relative">
        <Center w="full">
          <Text fontFamily="heading" color="secondaryColor" fontSize="lg">
            Despertadores
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
          data={alarmClocks}
          mt={8}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flex: 1 }}
          renderItem={({ item }) => <AlarmCard maxH="16" mb="2" {...item} />}
          ListEmptyComponent={() => (
            <Center h="full" mt="-8">
              <Placeholder
                color={colors.gray.quaternary}
                size={90}
                weight="thin"
              />
              <Text fontFamily="heading" color="gray.quaternary">
                Nenhum alarme cadastrado!
              </Text>
              <Text fontFamily="heading" color="gray.quaternary">
                Clique em "+" para adicionar um novo despertador.
              </Text>
            </Center>
          )}
        />
      )}
    </VStack>
  );
};
