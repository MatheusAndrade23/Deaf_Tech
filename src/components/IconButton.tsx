import { ReactNode } from 'react';
import { IconButton as NativeButton, IIconButtonProps } from 'native-base';

type Props = IIconButtonProps & {
  icon: ReactNode;
};

export const IconButton = ({ icon, ...rest }: Props) => {
  return (
    <NativeButton
      p="0"
      bg="transparent"
      _pressed={{
        bgColor: 'transparent',
      }}
      _icon={{
        as: icon,
      }}
      {...rest}
    />
  );
};
