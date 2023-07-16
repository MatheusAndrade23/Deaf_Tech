import AsyncStorage from '@react-native-async-storage/async-storage';

import { TOKEN_STORAGE } from '@storage/storageConfig';

export const storageAuthTokenSave = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_STORAGE, token);
};

export const storageAuthTokenGet = async () => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE);

  return token;
};

export const storageAuthTokenRemove = async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE);
};
