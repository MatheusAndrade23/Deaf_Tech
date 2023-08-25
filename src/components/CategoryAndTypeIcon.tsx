import { useTheme, Box, IBoxProps } from 'native-base';

import {
  Bed,
  ForkKnife,
  Bell,
  Volleyball,
  Toilet,
  TelevisionSimple,
  Flower,
  WifiHigh,
  Plugs,
} from 'phosphor-react-native';

import { Category, ModuleType } from '@dtos/ModuleDTO';

type Props = IBoxProps & {
  category: Category | ModuleType;
  color: string;
  border?: boolean;
};

export const CategoryAndTypeIcon = ({
  category,
  color,
  border = false,
  ...rest
}: Props) => {
  const { colors } = useTheme();

  const icon = () => {
    switch (category) {
      case 'Room':
        return <Bed size={30} color={color} />;

      case 'Kitchen':
        return <ForkKnife size={30} color={color} />;

      case 'Bell':
        return <Bell size={30} color={color} />;

      case 'ExternalArea':
        return <Volleyball size={30} color={color} />;

      case 'Toilet':
        return <Toilet size={30} color={color} />;

      case 'LivingRoom':
        return <TelevisionSimple size={30} color={color} />;

      case 'LivingRoom':
        return <TelevisionSimple size={30} color={color} />;

      case 'Garden':
        return <Flower size={30} color={color} />;

      case 'Wired':
        return <Plugs size={30} color={color} />;

      case 'Wireless':
        return <WifiHigh size={30} color={color} />;
    }
  };

  return (
    <Box
      borderWidth={border ? 1 : 0}
      borderColor={color}
      p={2}
      borderRadius={4}
      {...rest}
    >
      {icon()}
    </Box>
  );
};
