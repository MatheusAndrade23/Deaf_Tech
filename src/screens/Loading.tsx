import { Center, useTheme, Text } from "native-base";

import { Loading as LoadingComponent } from "@components/Loading";

export const Loading = () => {
  return (
    <Center flex={1} bg="bg">
      <Text color="lightColor" fontSize="3xl">
        Deaf Tech
      </Text>
      <LoadingComponent position="absolute" bottom={20} />
    </Center>
  );
};
