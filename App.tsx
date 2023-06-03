import { NativeBaseProvider, ToastProvider } from "native-base";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/theme";

import { Routes } from "@routes/index";
import { Loading } from "@screens/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <ToastProvider>{!fontsLoaded ? <Routes /> : <Loading />}</ToastProvider>
    </NativeBaseProvider>
  );
}
