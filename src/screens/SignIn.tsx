import { ScrollView, Center, useTheme, Image, Text, VStack } from 'native-base';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import {
  User,
  LockSimple,
  EnvelopeSimple,
  UserPlus,
} from 'phosphor-react-native';

import Logo from '@assets/logo.png';

export const SignIn = () => {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center flex={1} px="8">
        <Image source={Logo} alt="Logotipo" />
        <Text color="secondaryColor" fontFamily="heading" fontSize="md" my="4">
          Acesse sua conta
        </Text>
        <Input
          title="Email:"
          placeholder="Digite seu email"
          icon={<EnvelopeSimple color={colors.gray.tertiary} />}
        />
        <Input
          title="Senha:"
          placeholder="Digite sua senha"
          icon={<LockSimple color={colors.gray.tertiary} />}
        />
        <Button
          text="Entrar"
          mt="4"
          icon={<User color={colors.secondaryColor} weight="bold" />}
        />

        <VStack alignItems="center" w="70%" mt="20%">
          <Text fontFamily="body" color="secondaryColor">
            Ainda não tem acesso?
          </Text>
          <Button
            text="Criar conta"
            mt="4"
            h="12"
            variant="secondary"
            icon={
              <UserPlus color={colors.gray.tertiary} size="20" weight="bold" />
            }
          />
        </VStack>
      </Center>
    </ScrollView>
  );
};
