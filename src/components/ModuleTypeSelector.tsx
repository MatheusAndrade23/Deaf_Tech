import { Radio, HStack, useTheme, Text, IRadioGroupProps } from 'native-base';

import { ModuleType } from '@dtos/ModuleDTO';

import { WifiHigh, Plugs } from 'phosphor-react-native';

type Props = IRadioGroupProps & {
  selectedType: ModuleType;
  selectType: (type: ModuleType) => void;
};

export const ModuleTypeSelector = ({
  selectedType,
  selectType,
  ...rest
}: Props) => {
  const { colors } = useTheme();

  const elementsColor = (type: ModuleType) => {
    if (type === selectedType) {
      return colors.primaryColor;
    } else {
      return colors.secondaryColor;
    }
  };

  return (
    <Radio.Group
      onChange={(nextValue) => {
        selectType(nextValue);
      }}
      {...rest}
    >
      <HStack>
        <Plugs color={elementsColor('Wired')} />
        <Radio value="Wired" mx="1">
          <Text fontFamily="body" color={elementsColor('Wired')}>
            Módulo com fio
          </Text>
        </Radio>
      </HStack>

      <HStack mt="2">
        <WifiHigh color={elementsColor('Wireless')} />
        <Radio value="Wireless" mx="1">
          <Text fontFamily="body" color={elementsColor('Wireless')}>
            Módulo sem fio
          </Text>
        </Radio>
      </HStack>
    </Radio.Group>
  );
};
