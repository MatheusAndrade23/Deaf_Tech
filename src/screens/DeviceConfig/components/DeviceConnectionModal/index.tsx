import {
  Center,
  Text,
  useTheme,
  Modal,
  VStack,
  FlatList,
  Box,
} from 'native-base';

import { Device } from 'react-native-ble-plx';

import { Placeholder } from 'phosphor-react-native';

import { DeviceModalListItem } from './components/DeviceModalListItem';

type Props = {
  devices: Device[];
  isModalOpen: boolean;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

export const DeviceConnectionModal = ({
  isModalOpen,
  connectToPeripheral,
  closeModal,
  devices,
}: Props) => {
  const { colors } = useTheme();

  return (
    <Modal
      isOpen={isModalOpen}
      bgColor="secondaryColor"
      h="80%"
      marginBottom={0}
      marginTop="auto"
      borderTopLeftRadius="8"
      borderTopRightRadius="8"
    >
      <Modal.Content h="full" w="full">
        <VStack h="full" w="full" p="4">
          <Center>
            <Text fontFamily="heading" color="gray.primary" fontSize="md">
              Clique em um dispositivo para conectar
            </Text>
          </Center>
          <FlatList
            mt={4}
            data={devices}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              flex: 1,
            }}
            renderItem={({ item }) => (
              <DeviceModalListItem
                mb="2"
                item={item}
                connectToPeripheral={connectToPeripheral}
                closeModal={closeModal}
              />
            )}
            ListEmptyComponent={() => (
              <Center h="full">
                <Placeholder
                  color={colors.gray.quaternary}
                  size={90}
                  weight="thin"
                />
                <Text fontFamily="heading" color="gray.quaternary">
                  Nenhum dispositivo encontrado!
                </Text>
              </Center>
            )}
          />
        </VStack>
      </Modal.Content>
    </Modal>
  );
};
