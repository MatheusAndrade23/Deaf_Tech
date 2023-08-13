import { useState } from 'react';

import {
  Center,
  Button,
  Switch,
  Text,
  useTheme,
  IButtonProps,
  HStack,
  useToast,
} from 'native-base';

import { Loading } from '@components/Loading';
import { CategoryIcon } from '@components/CategoryIcon';

import { useAuth } from '@hooks/useAuth';
import { ModuleDTO } from '@dtos/ModuleDTO';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type Props = ModuleDTO & IButtonProps & {};

export const RoomCard = ({
  id,
  name,
  category,
  batteryLevel,
  active,
  ...rest
}: Props) => {
  const [checked, setChecked] = useState(active);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { user } = useAuth();
  const { colors } = useTheme();

  const handleChangeModuleState = (value: boolean) => {
    setIsLoading(true);
    toggleModuleState(value);

    if (checked !== value) {
      setChecked(value);
    }
  };

  const toggleModuleState = async (value: boolean) => {
    try {
      await api.patch(`/api/devices/toggle`, {
        email: user.email,
        id,
      });
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
      setChecked(!value);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      w="full"
      bg="gray.primary"
      p={0}
      borderWidth={1}
      borderColor={batteryLevel < 25 ? 'red.middle' : 'gray.primary'}
      _pressed={{ bg: 'gray.tertiary' }}
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
        <CategoryIcon
          category={category}
          color={checked ? colors.secondaryColor : colors.gray.secondary}
          position="absolute"
          left={4}
        />
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
          onToggle={handleChangeModuleState}
        />
      </HStack>
    </Button>
  );
};
