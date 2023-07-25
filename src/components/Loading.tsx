import { Center, Spinner, ICenterProps } from 'native-base';

type LoadingProps = ICenterProps & {
  size?: 'sm' | 'lg';
};

export const Loading = ({ size = 'lg', ...rest }: LoadingProps) => {
  return (
    <Center {...rest}>
      <Spinner color="primaryColor" size={size} />
    </Center>
  );
};
