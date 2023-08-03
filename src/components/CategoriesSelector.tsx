import { IconButton, HStack, useTheme, IBoxProps } from 'native-base';

import {
  ForkKnife,
  Bed,
  Bell,
  Volleyball,
  Toilet,
  TelevisionSimple,
  Flower,
} from 'phosphor-react-native';

import { Category } from '@dtos/ModuleDTO';

type Props = IBoxProps & {
  category: Category;
  selectCategory: (category: Category) => void;
};

export const CategoriesSelector = ({
  selectCategory,
  category,
  ...rest
}: Props) => {
  const { colors } = useTheme();

  return (
    <HStack {...rest}>
      <IconButton
        onPress={() => selectCategory('Kitchen')}
        borderWidth={1}
        borderColor={category === 'Kitchen' ? 'primaryColor' : 'gray.tertiary'}
        icon={
          <ForkKnife
            color={
              category === 'Kitchen'
                ? colors.primaryColor
                : colors.gray.tertiary
            }
            size={30}
          />
        }
      />
      <IconButton
        onPress={() => selectCategory('Room')}
        borderWidth={1}
        borderColor={category === 'Room' ? 'primaryColor' : 'gray.tertiary'}
        icon={
          <Bed
            color={
              category === 'Room' ? colors.primaryColor : colors.gray.tertiary
            }
            size={30}
          />
        }
      />
      <IconButton
        onPress={() => selectCategory('Bell')}
        borderWidth={1}
        borderColor={category === 'Bell' ? 'primaryColor' : 'gray.tertiary'}
        icon={
          <Bell
            color={
              category === 'Bell' ? colors.primaryColor : colors.gray.tertiary
            }
            size={30}
          />
        }
      />
      <IconButton
        onPress={() => selectCategory('ExternalArea')}
        borderWidth={1}
        borderColor={
          category === 'ExternalArea' ? 'primaryColor' : 'gray.tertiary'
        }
        icon={
          <Volleyball
            color={
              category === 'ExternalArea'
                ? colors.primaryColor
                : colors.gray.tertiary
            }
            size={30}
          />
        }
      />
      <IconButton
        onPress={() => selectCategory('Toilet')}
        borderWidth={1}
        borderColor={category === 'Toilet' ? 'primaryColor' : 'gray.tertiary'}
        icon={
          <Toilet
            color={
              category === 'Toilet' ? colors.primaryColor : colors.gray.tertiary
            }
            size={30}
          />
        }
      />
      <IconButton
        onPress={() => selectCategory('LivingRoom')}
        borderWidth={1}
        borderColor={
          category === 'LivingRoom' ? 'primaryColor' : 'gray.tertiary'
        }
        icon={
          <TelevisionSimple
            color={
              category === 'LivingRoom'
                ? colors.primaryColor
                : colors.gray.tertiary
            }
            size={30}
          />
        }
      />
      <IconButton
        onPress={() => selectCategory('Garden')}
        borderWidth={1}
        borderColor={category === 'Garden' ? 'primaryColor' : 'gray.tertiary'}
        icon={
          <Flower
            color={
              category === 'Garden' ? colors.primaryColor : colors.gray.tertiary
            }
            size={30}
          />
        }
      />
    </HStack>
  );
};
