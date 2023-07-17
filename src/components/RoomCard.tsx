import { useState } from 'react';
import { Center, HStack, Switch, Text, useTheme, IBoxProps } from 'native-base';

import { CategoryIcon } from '@components/CategoryIcon';

import { ModuleDTO } from '@dtos/ModuleDTO';

type Props = ModuleDTO & IBoxProps & {};

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
    <HStack
      w="full"
      alignItems="center"
      justifyContent="space-between"
      bg="gray.primary"
      position="relative"
      py="4"
      borderWidth={1}
      borderColor={batteryLevel < 25 ? 'red.middle' : 'gray.primary'}
      {...rest}
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
  );
};
