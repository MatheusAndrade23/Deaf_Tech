import { Center, Image, Text } from 'native-base';

import { Loading as LoadingComponent } from '@components/Loading';

import Logo from '@assets/logo.png';

export const Loading = () => {
  return (
    <Center flex={1} bg="bgColor">
      <Image source={Logo} alt="Logotipo" w="250" h="250" />
      <LoadingComponent position="absolute" bottom={20} />
    </Center>
  );
};
