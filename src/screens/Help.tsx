import { ScrollView, VStack, Text, Center } from 'native-base';

import YoutubePlayer from 'react-native-youtube-iframe';

import { LibrasButton } from '@components/LibrasButton';

export const Help = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack mt="8" p="2">
        <Center mb="4">
          <Text fontFamily="heading" color="primaryColor" fontSize="lg">
            DEAF TECH
          </Text>
        </Center>

        <YoutubePlayer height={215} play videoId={'DXTmdkuJo0w'} />

        <Text fontFamily="heading" color="primaryColor" fontSize="md" mt="4">
          O que é?
        </Text>

        <Text
          fontFamily="body"
          color="secondaryColor"
          mt="2"
          textAlign="justify"
        >
          O Deaf Tech é um sistema que monitora um ambiente e notifica o usuário
          se algum barulho notável foi detectado. O sistema foi desenvolvido com
          o objetivo de resolver problemas enfrentados por pessoas surdas, que
          não conseguem perceber batidas, coisas caindo, campainhas, choro de
          bebês e diversos outros sons que podem ser importantes indicadores de
          problemas, e que podem se tornar potencialmente perigosos se não forem
          percebidos.
        </Text>

        <Text fontFamily="heading" color="primaryColor" fontSize="md" mt="4">
          Como funciona?
        </Text>

        <Text
          fontFamily="body"
          color="secondaryColor"
          mt="2"
          textAlign="justify"
        >
          Através deste aplicativo, cada comodo pode ser configurado e
          personalizado, sendo possível definir o nome do comodo, fazer o upload
          de uma imagem para representá-lo, definir um nível de sensibilidade,
          definir sua categoria, entre outros. O aplicativo também permite
          configurar um dispositivo de IoT para cada comodo, que será
          responsável por monitorar o ambiente e enviar notificações para o
          aplicativo.
        </Text>
      </VStack>
    </ScrollView>
  );
};
