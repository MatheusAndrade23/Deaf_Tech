import { Center, Text, useTheme, Modal, HStack } from 'native-base';

import { Bluetooth, BluetoothX } from 'phosphor-react-native';

import { Loading } from '@components/Loading';

type Props = {
  bluetoothStatus: 'unknown' | 'on' | 'off';
  isModalOpen: boolean;
};

export const BluetoothStatusModal = ({
  bluetoothStatus,
  isModalOpen,
}: Props) => {
  const { colors } = useTheme();

  return (
    <Modal
      isOpen={isModalOpen}
      bgColor="secondaryColor"
      h="40%"
      marginBottom={0}
      marginTop="auto"
      borderTopLeftRadius="8"
      borderTopRightRadius="8"
      size="xl"
    >
      {bluetoothStatus == 'on' && (
        <Modal.Content h="full" w="full">
          <Modal.Body>
            <Center>
              <Bluetooth color={colors.primaryColor} size={180} weight="thin" />
              <Text fontFamily="heading" color={colors.primaryColor}>
                Bluetooth ligado
              </Text>
              <HStack alignItems="center" justifyContent="center" mt="8">
                <Text fontFamily="heading" fontSize="lg">
                  Procurando dispositivos...
                </Text>
                {/* <Loading size="lg" /> */}
              </HStack>
            </Center>
          </Modal.Body>
        </Modal.Content>
      )}
      {bluetoothStatus == 'off' && (
        <Modal.Content h="full" w="full">
          <Modal.Body>
            <Center>
              <BluetoothX color={colors.red.middle} size={180} weight="thin" />
              <Text fontFamily="heading" color={colors.red.middle}>
                Bluetooth desligado
              </Text>
              <Text fontFamily="heading" mt="8" fontSize="md">
                Por favor, ative o bluetooth do dispositivo
              </Text>
            </Center>
          </Modal.Body>
        </Modal.Content>
      )}
      {bluetoothStatus == 'unknown' && (
        <Modal.Content h="full" w="full">
          <Modal.Body h="320" alignItems="center" justifyContent="center">
            <Loading size="lg" />
          </Modal.Body>
        </Modal.Content>
      )}
    </Modal>
  );
};