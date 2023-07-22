import { Center, Text, useTheme, Modal } from 'native-base';

import { WarningOctagon, Bluetooth } from 'phosphor-react-native';
import { Button } from '@components/Button';

type Props = {
  isErrorModalVisible: boolean;
  connectToDevice: () => void;
};

export const ErrorModal = ({ isErrorModalVisible, connectToDevice }: Props) => {
  const { colors } = useTheme();

  return (
    <Modal
      isOpen={isErrorModalVisible}
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
            <WarningOctagon
              color={colors.red.middle}
              size={180}
              weight="thin"
            />
            <Text fontFamily="heading" fontSize="lg" color={colors.red.middle}>
              Erro ao tentar conectar
            </Text>
            <Button
              text="Tentar novamente"
              variant="tertiary"
              mt="8"
              onPress={connectToDevice}
              icon={<Bluetooth color={colors.secondaryColor} />}
            />
          </Center>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
