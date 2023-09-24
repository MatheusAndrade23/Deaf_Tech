import { Center, Text, useTheme, Modal, HStack } from 'native-base';

import { Bluetooth, BluetoothX, Plus, MapPin } from 'phosphor-react-native';

import { Loading } from '@components/Loading';
import { IconButton } from '@components/IconButton';
import { LibrasButton } from '@components/LibrasButton';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';

import { X } from 'phosphor-react-native';

type Props = {
  bluetoothStatus: 'unknown' | 'on' | 'off';
  isModalOpen: boolean;
};

export const BluetoothStatusModal = ({
  bluetoothStatus,
  isModalOpen,
}: Props) => {
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const navigateToHome = () => {
    navigation.navigate('app', { screen: 'home' });
  };

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
            <IconButton
              icon={<X color={colors.red.middle} weight="bold" size={25} />}
              position="absolute"
              top={4}
              right={2}
              onPress={navigateToHome}
              zIndex={100}
            />
            <Center mt="6">
              <HStack
                alignItems="center"
                w="full"
                justifyContent="space-evenly"
              >
                <BluetoothX
                  color={colors.red.middle}
                  size={120}
                  weight="thin"
                />
                <Plus color={colors.gray.secondary} size={40} weight="bold" />
                <MapPin color={colors.red.middle} size={120} weight="thin" />
              </HStack>

              <Text
                fontFamily="heading"
                fontSize="md"
                color={colors.red.middle}
              >
                Bluetooth desligado
              </Text>
              <Text
                fontFamily="heading"
                mt="8"
                textAlign="left"
                maxWidth="70%"
                alignSelf="flex-start"
                ml="4"
              >
                Por favor, ative o bluetooth e a localização do dispositivo
              </Text>
            </Center>
            <LibrasButton bottom={4} />
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
