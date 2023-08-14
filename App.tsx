import { ToastProvider } from 'native-base';
import { ThemeProvider } from '@contexts/ThemeContext';
import { AuthContextProvider } from '@contexts/AuthContext';

import OneSignal from 'react-native-onesignal';

import { ONESIGNAL_APP_ID } from '@env';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';
import { Loading } from '@screens/Loading';

OneSignal.setAppId(ONESIGNAL_APP_ID);
// OneSignal.setEmail('house1@email.com');

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <ToastProvider>{fontsLoaded ? <Routes /> : <Loading />}</ToastProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
