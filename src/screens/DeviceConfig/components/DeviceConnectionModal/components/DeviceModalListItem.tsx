import { useCallback } from 'react';
import { Button, IButtonProps, Text, useToast } from 'native-base';

import { Device } from 'react-native-ble-plx';

type DeviceModalListItemProps = IButtonProps & {
  item: Device;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

export const DeviceModalListItem = ({
  item,
  connectToPeripheral,
  closeModal,
  ...rest
}: DeviceModalListItemProps) => {
  const toast = useToast();

  const connectAndCloseModal = useCallback(() => {
    try {
      connectToPeripheral(item);
      closeModal();
    } catch (error) {
      const title = 'Erro ao conectar ao dispositivo';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });

      console.log(error);
    }
  }, [closeModal, connectToPeripheral, item]);

  return (
    <Button
      w="full"
      bg="gray.secondary"
      px={0}
      py="4"
      _pressed={{ bg: 'gray.tertiary' }}
      onPress={connectAndCloseModal}
      {...rest}
    >
      <Text color="secondaryColor" fontFamily="heading">
        {item.name}
      </Text>
    </Button>
  );
};
