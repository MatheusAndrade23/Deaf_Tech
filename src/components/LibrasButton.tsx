import { useState } from 'react';

import { useTheme, Modal, Text, IIconButtonProps } from 'native-base';

import { IconButton } from '@components/IconButton';
import YoutubePlayer from 'react-native-youtube-iframe';

import LibrasLogo from '@assets/libras.svg';

type Props = IIconButtonProps & {
  url: string;
};

export const LibrasButton = ({ url = '', ...rest }: Props) => {
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
        {...rest}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content w="full" mt="auto">
          <Modal.CloseButton />
          <Modal.Header>
            <Text fontFamily="heading" color="primaryColor">
              LIBRAS
            </Text>
          </Modal.Header>

          <Modal.Body>
            {url.length > 0 && (
              <YoutubePlayer height={215} play videoId={url} />
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
