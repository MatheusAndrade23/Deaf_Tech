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

export const SignUp = () => {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center flex={1} px="8">
        <Image source={Logo} alt="Logotipo" w="200" h="180" />
        <Text color="secondaryColor" fontFamily="heading" fontSize="md" mb="4">
          Crie uma conta
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
        <Input
          title="Confirme sua senha:"
          placeholder="Confirme sua senha"
          icon={<LockSimple color={colors.gray.tertiary} />}
        />
        <Button
          text="Criar conta"
          mt="4"
          icon={<UserPlus color={colors.secondaryColor} weight="bold" />}
        />

        <VStack alignItems="center" w="70%" mt="15%">
          <Text fontFamily="body" color="secondaryColor">
            Já possui uma conta?
          </Text>
          <Button
            text="Entrar"
            mt="4"
            h="12"
            variant="secondary"
            icon={<User color={colors.gray.tertiary} />}
          />
        </VStack>
      </Center>
    </ScrollView>
  );
};
