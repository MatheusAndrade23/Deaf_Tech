import { VStack, HStack, useTheme, Text, Checkbox } from 'native-base';

type Props = {
  days: string[];
  setDays: (days: string[]) => void;
};

export const AlarmClockDaysSelector = ({ days, setDays, ...rest }: Props) => {
  const { colors } = useTheme();

  const elementsColor = (day: string) => {
    if (days.includes(day)) {
      return colors.primaryColor;
    } else {
      return colors.secondaryColor;
    }
  };

  const handleSelectDay = (day: string) => {
    if (days.includes(day)) {
      //@ts-ignore
      setDays((prevState: string[]) =>
        prevState.filter((prevDay: string) => prevDay !== day),
      );
    } else {
      //@ts-ignore
      setDays((prevState: string[]) => [...prevState, day]);
    }
  };

  return (
    <HStack mt="2">
      <VStack>
        <Checkbox
          value="segunda"
          my="1"
          onTouchStart={() => handleSelectDay('segunda')}
        >
          <Text fontFamily="body" color={elementsColor('segunda')}>
            Segunda Feira
          </Text>
        </Checkbox>
        <Checkbox
          value="terça"
          my="1"
          onTouchStart={() => handleSelectDay('terça')}
        >
          <Text fontFamily="body" color={elementsColor('terça')}>
            Terça Feira
          </Text>
        </Checkbox>
        <Checkbox
          value="quarta"
          my="1"
          onTouchStart={() => handleSelectDay('quarta')}
        >
          <Text fontFamily="body" color={elementsColor('quarta')}>
            Quarta Feira
          </Text>
        </Checkbox>
        <Checkbox
          value="quinta"
          my="1"
          onTouchStart={() => handleSelectDay('quinta')}
        >
          <Text fontFamily="body" color={elementsColor('quinta')}>
            Quinta Feira
          </Text>
        </Checkbox>
      </VStack>

      <VStack ml="5">
        <Checkbox
          value="sexta"
          my="1"
          onTouchStart={() => handleSelectDay('sexta')}
        >
          <Text fontFamily="body" color={elementsColor('sexta')}>
            Sexta Feira
          </Text>
        </Checkbox>
        <Checkbox
          value="sábado"
          my="1"
          onTouchStart={() => handleSelectDay('sábado')}
        >
          <Text fontFamily="body" color={elementsColor('sábado')}>
            Sábado
          </Text>
        </Checkbox>
        <Checkbox
          value="domingo"
          my="1"
          onTouchStart={() => handleSelectDay('domingo')}
        >
          <Text fontFamily="body" color={elementsColor('domingo')}>
            Domingo
          </Text>
        </Checkbox>
      </VStack>
    </HStack>
  );
};
