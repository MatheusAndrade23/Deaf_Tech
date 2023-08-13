import { ToastProvider } from 'native-base';
import { ThemeProvider } from '@contexts/ThemeContext';
import { AuthContextProvider } from '@contexts/AuthContext';

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
      <AuthContextProvider>
        <ToastProvider>{fontsLoaded ? <Routes /> : <Loading />}</ToastProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
