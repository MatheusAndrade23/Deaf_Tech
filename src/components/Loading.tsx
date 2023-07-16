import { Center, Spinner, ICenterProps } from 'native-base';

type LoadingProps = ICenterProps & {};

export const Loading = ({ ...rest }: LoadingProps) => {
  return (
    <Center {...rest}>
      <Spinner color="lightColor" size="lg" />
    </Center>
  );
};
