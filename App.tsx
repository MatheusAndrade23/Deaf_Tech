import { NativeBaseProvider, ToastProvider } from 'native-base';

import OneSignal from 'react-native-onesignal';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { THEME } from './src/theme';

import { Routes } from '@routes/index';
import { Loading } from '@screens/Loading';

import { APP_ID_ONESIGNAL } from '@env';

OneSignal.setAppId(APP_ID_ONESIGNAL);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  console.log('APP_ID_ONESIGNAL', APP_ID_ONESIGNAL);

  return (
    <NativeBaseProvider theme={THEME}>
      <ToastProvider>{fontsLoaded ? <Routes /> : <Loading />}</ToastProvider>
    </NativeBaseProvider>
  );
}
