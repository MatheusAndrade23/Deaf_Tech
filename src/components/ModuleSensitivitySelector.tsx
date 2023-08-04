import {
  Checkbox,
  HStack,
  useTheme,
  Text,
  ICheckboxGroupProps,
} from 'native-base';

import { ModuleSensitivity } from '@dtos/ModuleDTO';

import { SpeakerHigh, SpeakerLow, SpeakerNone } from 'phosphor-react-native';

type Props = ICheckboxGroupProps & {
  selectedSensitivity: ModuleSensitivity[];
  selectSensitivity: (Sensitivity: ModuleSensitivity[]) => void;
};

export const ModuleSensitivitySelector = ({
  selectedSensitivity,
  selectSensitivity,
  ...rest
}: Props) => {
  const { colors } = useTheme();

  const elementsColor = (sensitivity: ModuleSensitivity) => {
    const sensitivityIsSelected = selectedSensitivity.includes(sensitivity);

    if (sensitivityIsSelected) {
      return colors.primaryColor;
    } else {
      return colors.secondaryColor;
    }
  };

  return (
    <Checkbox.Group
      onChange={(value) => selectSensitivity(value || [])}
      value={selectedSensitivity}
      {...rest}
    >
      <HStack>
        <SpeakerHigh color={elementsColor('High')} />
        <Checkbox value="High" mx="1">
          <Text fontFamily="body" color={elementsColor('High')}>
            Módulo com fio
          </Text>
        </Checkbox>
      </HStack>

      <HStack>
        <SpeakerLow color={elementsColor('Medium')} />
        <Checkbox value="Medium" mx="1">
          <Text fontFamily="body" color={elementsColor('Medium')}>
            Módulo sem fio
          </Text>
        </Checkbox>
      </HStack>

      <HStack>
        <SpeakerNone color={elementsColor('Low')} />
        <Checkbox value="Low" mx="1">
          <Text fontFamily="body" color={elementsColor('Low')}>
            Módulo com fio
          </Text>
        </Checkbox>
      </HStack>
    </Checkbox.Group>
  );
};
