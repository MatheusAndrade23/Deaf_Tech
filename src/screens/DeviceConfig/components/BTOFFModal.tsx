import { Center, Text, useTheme, Modal } from 'native-base';

import { BluetoothX } from 'phosphor-react-native';

type Props = {
  isBTOFFModalVisible: boolean;
};

export const BTOFFModal = ({ isBTOFFModalVisible }: Props) => {
  const { colors } = useTheme();

  return (
    <Modal
      isOpen={isBTOFFModalVisible}
      bgColor="secondaryColor"
      h="40%"
      marginBottom={0}
      marginTop="auto"
      borderTopLeftRadius="8"
      borderTopRightRadius="8"
      size="xl"
    >
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
    </Modal>
  );
};
