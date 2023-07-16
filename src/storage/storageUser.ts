import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserDTO } from '@dtos/UserDTO';
import { USER_STORAGE } from '@storage/storageConfig';

export const storageUserSave = async (user: UserDTO) => {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
};

export const storageUserGet = async () => {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: UserDTO = storage ? JSON.parse(storage) : {};

  return user;
};

export const storageUserRemove = async () => {
  await AsyncStorage.removeItem(USER_STORAGE);
};
