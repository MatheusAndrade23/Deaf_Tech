import { useState } from 'react';

import {
  Center,
  Button as NativeButton,
  Switch,
  Text,
  useTheme,
  IButtonProps,
  HStack,
  useToast,
  Modal,
  VStack,
} from 'native-base';

import { Loading } from '@components/Loading';
import { Button } from '@components/Button';

import { useAuth } from '@hooks/useAuth';
import { AlarmClockDTO } from '@dtos/AlarmClockDTO';

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type Props = AlarmClockDTO & IButtonProps & {};

export const AlarmCard = ({ id, name, days, active, time, ...rest }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState(active);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { user } = useAuth();
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleChangeAlarmState = (value: boolean) => {
    // setIsLoading(true);
    toggleAlarmState(value);

    if (checked !== value) {
      setChecked(value);
    }
  };

  const toggleAlarmState = async (value: boolean) => {
    // try {
    //   await api.patch(`/api/devices/toggle`, {
    //     email: user.email,
    //     id,
    //   });
    // } catch (error) {
    //   const isAppError = error instanceof AppError;
    //   const title = isAppError
    //     ? error.message
    //     : 'Não foi possível alterar o estado do dispositivo. Tente Novamente!';
    //   toast.show({
    //     title,
    //     placement: 'top',
    //     bgColor: 'red.middle',
    //   });
    //   setChecked(!value);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <>
      <NativeButton
        w="full"
        bg="gray.primary"
        p={0}
        borderColor="gray.primary"
        borderWidth={1}
        _pressed={{ bg: 'gray.tertiary' }}
        onPress={() => setIsModalVisible(true)}
        {...rest}
      >
        <HStack
          w="full"
          h="full"
          alignItems="center"
          justifyContent="space-between"
          position="relative"
        >
          {isLoading && (
            <Center
              flex={1}
              w="full"
              h="full"
              position="absolute"
              zIndex={100}
              backgroundColor="rgba(0,0,0,0.5)"
            >
              <Loading />
            </Center>
          )}
          <Text
            position="absolute"
            left="4"
            color={checked ? colors.secondaryColor : colors.gray.secondary}
            fontFamily="heading"
            fontSize="lg"
          >
            {time}
          </Text>
          <Center w="full" h="full">
            <Text
              color={checked ? colors.secondaryColor : colors.gray.secondary}
              fontFamily="body"
              fontSize="md"
            >
              {name}
            </Text>
          </Center>
          <Switch
            p={0}
            size="lg"
            position="absolute"
            right={4}
            offTrackColor="gray.tertiary"
            onTrackColor="primaryColor"
            offThumbColor="gray.secondary"
            isChecked={checked}
            onToggle={handleChangeAlarmState}
          />
        </HStack>
      </NativeButton>
      <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <Modal.Content w="full" mt="auto">
          <Modal.CloseButton />

          <Modal.Header>
            <Center>
              <Text fontFamily="heading" color="gray.primary" fontSize="lg">
                {name}
              </Text>
            </Center>
          </Modal.Header>

          <Modal.Body pt="0">
            <Text fontFamily="body" color="primaryColor" fontSize="7xl">
              {time}
            </Text>
            <VStack>
              <Text fontFamily="heading" color="gray.primary">
                Quando irá tocar:
              </Text>
              <HStack>
                {days.length === 7 && <Text>Todos os dias</Text>}
                {days.length < 7 &&
                  days.map((day) => (
                    <Text fontStyle="italic">{formatDay(day)}</Text>
                  ))}
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack w="full" justifyContent="space-between">
              <Button
                w="48%"
                text="Editar"
                onPress={() => setIsModalVisible(false)}
              />
              <Button
                w="48%"
                text="Excluir"
                variant="tertiary"
                borderWidth={0}
                onPress={() => setIsModalVisible(false)}
              />
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

const formatDay = (day: string) => {
  const treatedDay = day.charAt(0).toUpperCase() + day.slice(1) + ' ';

  return treatedDay;
};
