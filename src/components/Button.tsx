import { ReactNode } from 'react';
import {
  Button as NativeButton,
  IButtonProps,
  Text,
  HStack,
  Box,
  useTheme,
  Center,
} from 'native-base';

type Props = IButtonProps & {
  text: string;
  icon?: ReactNode;
  variant?: 'default' | 'secondary' | 'tertiary';
};

export const Button = ({
  text,
  icon,
  variant = 'default',
  disabled,
  ...rest
}: Props) => {
  const { colors } = useTheme();

  const buttonStyle = () => {
    switch (variant) {
      case 'default': {
        return {
          bg: colors.primaryColor,
          pressed: colors.gray.tertiary,
          borderColor: null,
          borderWidth: 0,
        };
      }

      case 'secondary': {
        return {
          bg: colors.secondaryColor,
          pressed: colors.gray.secondary,
          borderColor: null,
          borderWidth: 0,
        };
      }

      case 'tertiary': {
        return {
          bg: colors.gray.primary,
          pressed: colors.gray.tertiary,
          borderColor: colors.secondaryColor,
          borderWidth: 1,
        };
      }
    }
  };

  const textStyle = (disabled: boolean | null | undefined) => {
    if (disabled) {
      return {
        color: colors.gray.tertiary,
      };
    }
    switch (variant) {
      case 'secondary': {
        return {
          color: colors.gray.tertiary,
        };
      }

      default: {
        return {
          color: colors.secondaryColor,
        };
      }
    }
  };

  const style = buttonStyle();

  return (
    <NativeButton
      p={0}
      w="full"
      h={14}
      position="relative"
      borderColor={style?.borderColor}
      borderWidth={style?.borderWidth}
      bg={style?.bg}
      _pressed={{
        bg: style?.pressed,
      }}
      {...rest}
      disabled={disabled}
    >
      <HStack w="full" h="full" alignItems="center">
        <Center w="full">
          <Text fontFamily="heading" fontSize="sm" {...textStyle(disabled)}>
            {text}
          </Text>
        </Center>
        <Box position="absolute" right="4">
          {icon && icon}
        </Box>
      </HStack>
    </NativeButton>
  );
};
