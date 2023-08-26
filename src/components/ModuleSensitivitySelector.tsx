import { Radio, HStack, useTheme, Text, IRadioGroupProps } from 'native-base';

import { ModuleSensitivity } from '@dtos/ModuleDTO';

import { SpeakerHigh, SpeakerLow, SpeakerNone } from 'phosphor-react-native';

type Props = IRadioGroupProps & {
  selectedSensitivity: ModuleSensitivity;
  selectSensitivity: (Sensitivity: ModuleSensitivity) => void;
};

export const ModuleSensitivitySelector = ({
  selectedSensitivity,
  selectSensitivity,
  ...rest
}: Props) => {
  const { colors } = useTheme();

  const elementsColor = (sensitivity: ModuleSensitivity) => {
    if (sensitivity === selectedSensitivity) {
      return colors.primaryColor;
    } else {
      return colors.secondaryColor;
    }
  };

  return (
    <Radio.Group
      defaultValue={selectedSensitivity}
      onChange={(value) => selectSensitivity(value)}
      value={selectedSensitivity}
      {...rest}
    >
      <HStack>
        <SpeakerHigh color={elementsColor('High')} />
        <Radio value="High" mx="1">
          <Text fontFamily="body" color={elementsColor('High')}>
            Barulho alto
          </Text>
        </Radio>
      </HStack>

      <HStack mt="2">
        <SpeakerLow color={elementsColor('Medium')} />
        <Radio value="Medium" mx="1">
          <Text fontFamily="body" color={elementsColor('Medium')}>
            Barulho médio
          </Text>
        </Radio>
      </HStack>

      <HStack mt="2">
        <SpeakerNone color={elementsColor('Low')} />
        <Radio value="Low" mx="1">
          <Text fontFamily="body" color={elementsColor('Low')}>
            Barulho baixo
          </Text>
        </Radio>
      </HStack>
    </Radio.Group>
  );
};
