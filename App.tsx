import { useEffect } from 'react';
import { ToastProvider } from 'native-base';

import { ThemeProvider } from '@contexts/ThemeContext';
import { AuthContextProvider } from '@contexts/AuthContext';
import { NotificationProvider } from '@contexts/NotificationContext';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';
import { Loading } from '@screens/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthContextProvider>
          <NotificationProvider>
            {fontsLoaded ? <Routes /> : <Loading />}
          </NotificationProvider>
        </AuthContextProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
