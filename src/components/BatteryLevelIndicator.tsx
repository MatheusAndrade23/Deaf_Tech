import { useTheme, Box, IBoxProps } from 'native-base';

import { BatteryFull, BatteryMedium, BatteryLow } from 'phosphor-react-native';

type Props = IBoxProps & {
  batteryLevel: number;
};

export const BatteryLevelIndicator = ({
  color,
  batteryLevel,
  ...rest
}: Props) => {
  const { colors } = useTheme();

  const iconAndColor = () => {
    if (batteryLevel > 80) {
      return {
        icon: <BatteryFull size={30} color={colors.green.light} />,
        color: colors.yellow.light,
      };
    } else if (batteryLevel > 20) {
      return {
        icon: <BatteryMedium size={30} color={colors.yellow.light} />,
        color: colors.yellow.light,
      };
    } else {
      return {
        icon: <BatteryLow size={30} color={colors.red.middle} />,
        color: colors.red.middle,
      };
    }
  };

  return (
    <Box
      borderWidth={1}
      borderColor={iconAndColor().color}
      p={2}
      borderRadius={4}
      {...rest}
    >
      {iconAndColor().icon}
    </Box>
  );
};
