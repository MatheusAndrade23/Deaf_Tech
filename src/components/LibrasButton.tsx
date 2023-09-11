import { useState } from 'react';

import { useTheme, Modal, Text } from 'native-base';

import { IconButton } from '@components/IconButton';

import LibrasLogo from '@assets/libras.svg';

export const LibrasButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colors } = useTheme();

  return (
    <>
      <IconButton
        bg="white"
        position="absolute"
        right="6"
        bottom="6"
        h="12"
        w="12"
        pb="1"
        alignItems="center"
        justifyContent="center"
        _pressed={{
          bgColor: 'white',
        }}
        icon={<LibrasLogo fill={colors.primaryColor} width={88} height={88} />}
        onPress={() => {
          setIsModalOpen(true);
        }}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content w="full" minH="500">
          <Modal.CloseButton />
          <Modal.Header>
            <Text>LIBRAS</Text>
          </Modal.Header>
        </Modal.Content>
      </Modal>
    </>
  );
};
