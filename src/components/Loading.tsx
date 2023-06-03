import { Center, Spinner, IBoxProps } from "native-base";

type LoadingProps = IBoxProps & {};

export const Loading = ({ ...rest }: LoadingProps) => {
  return (
    <Center {...rest}>
      <Spinner color="lightColor" />
    </Center>
  );
};
