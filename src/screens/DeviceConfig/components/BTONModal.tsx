import { Center, Text, useTheme, Modal, HStack } from 'native-base';

import { Bluetooth } from 'phosphor-react-native';

import { Loading } from '@components/Loading';

type Props = {
  isBTONModalVisible: boolean;
};

export const BTONModal = ({ isBTONModalVisible }: Props) => {
  const { colors } = useTheme();

  return (
    <Modal
      isOpen={isBTONModalVisible}
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
            <Bluetooth color={colors.primaryColor} size={180} weight="thin" />
            <Text fontFamily="heading" color={colors.primaryColor}>
              Bluetooth ligado
            </Text>
            <HStack alignItems="center" justifyContent="center" mt="8">
              <Text fontFamily="heading" fontSize="lg" mr="4">
                Conectando...
              </Text>
              <Loading size="lg" />
            </HStack>
          </Center>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
