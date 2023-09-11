import { useState, useCallback } from 'react';
import {
  VStack,
  HStack,
  Center,
  Text,
  useTheme,
  FlatList,
  useToast,
} from 'native-base';

import { Plus, Placeholder } from 'phosphor-react-native';

import { Loading } from '@components/Loading';
import { IconButton } from '@components/IconButton';
import { AlarmCard } from '@components/AlarmCard';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useAuth } from '@hooks/useAuth';
import { AlarmClockDTO } from '@dtos/AlarmClockDTO';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

export const AlarmClock = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [alarmClocks, setAlarmClocks] = useState<AlarmClockDTO[]>([]);

  const toast = useToast();
  const { user } = useAuth();
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const goToNewAlarmClockScreen = () => {
    navigation.navigate('newAlarmClock');
  };

  const deleteAlarm = async (id: string) => {
    setIsLoadingData(true);
    try {
      const { data } = await api.delete(`/api/alarms/${user.email}/${id}`);
      setAlarmClocks(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível excluir o dispositivo. Tente Novamente!';

      if (isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.middle',
        });
      }
    } finally {
      setIsLoadingData(false);
    }
  };

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const { data } = await api.get<AlarmClockDTO[]>(
        `/api/alarms/${user.email}`,
      );
      setAlarmClocks(data);
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
      setAlarmClocks([]);
    } finally {
      setIsLoadingData(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

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
          onPress={goToNewAlarmClockScreen}
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
          renderItem={({ item }) => (
            <AlarmCard maxH="16" mb="2" deleteAlarm={deleteAlarm} {...item} />
          )}
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
