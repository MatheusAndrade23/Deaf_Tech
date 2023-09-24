import { VStack, HStack, useTheme, Text, Checkbox } from 'native-base';

type Props = {
  days: string[];
  setDays: (days: string[]) => void;
};

export const AlarmClockDaysSelector = ({
  days = [],
  setDays,
  ...rest
}: Props) => {
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
        <HStack alignItems="center">
          <Checkbox
            value="segunda"
            my="1"
            aria-label="Segunda Feira"
            onChange={() => handleSelectDay('segunda')}
            isChecked={days.includes('segunda')}
          />
          <Text fontFamily="body" color={elementsColor('segunda')} ml="2">
            Segunda Feira
          </Text>
        </HStack>

        <HStack alignItems="center">
          <Checkbox
            value="terça"
            my="1"
            aria-label="Terça Feira"
            onChange={() => handleSelectDay('terça')}
            isChecked={days.includes('terça')}
          />
          <Text fontFamily="body" color={elementsColor('terça')} ml="2">
            Terça Feira
          </Text>
        </HStack>

        <HStack alignItems="center">
          <Checkbox
            value="quarta"
            my="1"
            aria-label="Quarta Feira"
            onChange={() => handleSelectDay('quarta')}
            isChecked={days.includes('quarta')}
          />
          <Text fontFamily="body" color={elementsColor('quarta')} ml="2">
            Quarta Feira
          </Text>
        </HStack>

        <HStack alignItems="center">
          <Checkbox
            value="quinta"
            my="1"
            aria-label="Quinta Feira"
            onChange={() => handleSelectDay('quinta')}
            isChecked={days.includes('quinta')}
          />
          <Text fontFamily="body" color={elementsColor('quinta')} ml="2">
            Quinta Feira
          </Text>
        </HStack>
      </VStack>

      <VStack ml="5">
        <HStack alignItems="center">
          <Checkbox
            value="sexta"
            my="1"
            aria-label="Sexta Feira"
            onChange={() => handleSelectDay('sexta')}
            isChecked={days.includes('sexta')}
          />
          <Text fontFamily="body" color={elementsColor('sexta')} ml="2">
            Sexta Feira
          </Text>
        </HStack>

        <HStack alignItems="center">
          <Checkbox
            value="sábado"
            my="1"
            aria-label="Sábado"
            onChange={() => handleSelectDay('sábado')}
            isChecked={days.includes('sábado')}
          />
          <Text fontFamily="body" color={elementsColor('sábado')} ml="2">
            Sábado
          </Text>
        </HStack>

        <HStack alignItems="center">
          <Checkbox
            value="domingo"
            my="1"
            aria-label="Domingo"
            onChange={() => handleSelectDay('domingo')}
            isChecked={days.includes('domingo')}
          />
          <Text fontFamily="body" color={elementsColor('domingo')} ml="2">
            Domingo
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};
