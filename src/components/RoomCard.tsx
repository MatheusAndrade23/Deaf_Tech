import { useState } from 'react';

import {
  Center,
  Button,
  Switch,
  Text,
  useTheme,
  IButtonProps,
  HStack,
} from 'native-base';

import { CategoryIcon } from '@components/CategoryIcon';

import { ModuleDTO } from '@dtos/ModuleDTO';

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
  const { colors } = useTheme();

  const handleChangeModuleState = () => {
    setChecked(!checked);
  };

  return (
    <Button
      w="full"
      bg="gray.primary"
      px={0}
      py="4"
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
