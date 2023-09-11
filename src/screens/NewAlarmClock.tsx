import { LogBox } from 'react-native';
import { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  ScrollView,
  HStack,
  Center,
  Text,
  useTheme,
  VStack,
  useToast,
} from 'native-base';

import uuid from 'react-native-uuid';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { IconButton } from '@components/IconButton';
import { AlarmClockDaysSelector } from '@components/AlarmClockDaysSelector';

import { useAuth } from '@hooks/useAuth';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';

import { ArrowLeft, Clock, Pencil, FloppyDisk, X } from 'phosphor-react-native';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type FormDataProps = {
  name: string;
};

const createDeviceSchema = yup.object({
  name: yup.string().required('Informe o nome do dispositivo.'),
});

export const NewAlarmClock = () => {
  const [showTimePicker, setShowTimePicker] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState<string[]>([]);

  const toast = useToast();
  const { colors } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(createDeviceSchema),
  });

  const handleGoBack = () => {
    navigation.navigate('app', { screen: 'alarm' });
  };

  const onTimePickerChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    setShowTimePicker(false);
    setDate(currentDate);
  };

  const handleCreateAlarm = async (data: FormDataProps) => {
    setLoading(true);

    const generatedId = uuid.v4();
    //@ts-ignore
    const id = generatedId.replace(/\D/g, '').slice(0, 6);

    try {
      await api.post(`/api/alarms/create/`, {
        email: user.email,
        alarm: {
          id,
          name: data.name,
          time: date,
          days,
        },
      });

      toast.show({
        title: 'Alarme criado com sucesso!',
        placement: 'top',
        bgColor: 'green.light',
      });

      navigation.navigate('app', { screen: 'alarm' });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível criar o alarme. Tente Novamente!';

      if (isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.middle',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {loading && (
        <Center
          w="full"
          h="full"
          position="absolute"
          zIndex={100}
          bg="rgba(0,0,0,0.5)"
        >
          <Loading />
        </Center>
      )}

      <VStack flex={1} p="4" mt="8">
        <HStack w="full" position="relative" alignItems="center">
          <IconButton
            left="0"
            position="absolute"
            icon={<ArrowLeft color={colors.secondaryColor} size={30} />}
            zIndex={100}
            p={0}
            onPress={handleGoBack}
          />
          <Center w="full">
            <Text fontFamily="heading" color="secondaryColor" fontSize="lg">
              Novo Alarme
            </Text>
          </Center>
        </HStack>

        <HStack alignItems="center" justifyContent="space-between" mt="4">
          <Text fontFamily="body" color="secondaryColor" fontSize="8xl">
            {date && date?.getHours() < 10
              ? '0' + date?.getHours()
              : date?.getHours()}
            :
            {date && date?.getMinutes() < 10
              ? '0' + date?.getMinutes()
              : date?.getMinutes()}
          </Text>
          <IconButton
            height={14}
            width={14}
            bg={colors.primaryColor}
            _pressed={{ bg: colors.gray.tertiary }}
            icon={<Clock color={colors.secondaryColor} size={40} />}
            onPress={() => setShowTimePicker(true)}
          />
        </HStack>

        {showTimePicker && (
          <DateTimePicker
            style={{ width: 300, height: 300 }}
            testID="dateTimePicker"
            value={date ? date : new Date()}
            mode="time"
            is24Hour={true}
            onChange={onTimePickerChange}
          />
        )}

        <VStack mt="4">
          <Text fontFamily="heading" color="secondaryColor" fontSize="md">
            Nome:
          </Text>

          <Controller
            control={control}
            name="name"
            rules={{ required: 'Informe o nome do alarme:' }}
            render={({ field: { onChange, value } }) => (
              <Input
                mt="4"
                placeholder="Nome do alarme"
                icon={<Pencil color={colors.gray.tertiary} />}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
                autoCapitalize="none"
                value={value}
              />
            )}
          />
        </VStack>

        <VStack mt="4">
          <Text fontFamily="heading" color="secondaryColor" fontSize="md">
            Dias:
          </Text>
          <AlarmClockDaysSelector days={days} setDays={setDays} />
        </VStack>
      </VStack>

      <VStack p="4">
        <Button
          text="Criar"
          variant="secondary"
          icon={<FloppyDisk color={colors.gray.tertiary} />}
          onPress={handleSubmit(handleCreateAlarm)}
        />
        <Button
          text="Cancelar"
          mt="2"
          variant="tertiary"
          icon={<X color={colors.secondaryColor} />}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
};

LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
]);
