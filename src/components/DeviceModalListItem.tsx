import { useCallback } from 'react';
import { Button, IButtonProps, Text } from 'native-base';

import { BleError, Device } from 'react-native-ble-plx';

type DeviceModalListItemProps = IButtonProps & {
  device: Device;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
  errorFunction: (device: Device, error: unknown) => void;
};

export const DeviceModalListItem = ({
  device,
  connectToPeripheral,
  closeModal,
  errorFunction,
  ...rest
}: DeviceModalListItemProps) => {
  const connectAndCloseModal = useCallback(() => {
    try {
      connectToPeripheral(device);
      closeModal();
    } catch (error) {
      errorFunction(device, error);
    }
  }, [closeModal, connectToPeripheral, device]);

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
        {device.name}
      </Text>
    </Button>
  );
};
