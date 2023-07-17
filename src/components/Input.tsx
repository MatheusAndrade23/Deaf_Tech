import { ReactNode } from 'react';

import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  HStack,
  Box,
} from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
  title?: string | null;
  icon: ReactNode;
};

export const Input = ({
  errorMessage = null,
  isInvalid,
  icon,
  title = null,
  ...rest
}: Props) => {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      {title && (
        <FormControl.Label
          _text={{
            color: 'secondaryColor',
          }}
        >
          {title}
        </FormControl.Label>
      )}

      <NativeBaseInput
        bg="gray.primary"
        minH={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="secondaryColor"
        fontFamily="body"
        placeholderTextColor="gray.tertiary"
        InputRightElement={<Box mr="4">{icon}</Box>}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.middle',
        }}
        _focus={{
          bgColor: 'gray.primary',
          borderWidth: 1,
          borderColor: 'primaryColor',
        }}
        {...rest}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.middle' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
