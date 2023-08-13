import { createContext, ReactNode, useState, useEffect } from 'react';

import { UserDTO } from '@dtos/UserDTO';

import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser';

import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from '@storage/storageAuthToken';

import { api } from '@services/api';

import { Loading } from '@components/Loading';

export type AuthContextDataProps = {
  user: UserDTO;
  singIn: (email: string, password: string) => void;
  token: string;
  signOut: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [user, setUser] = useState<UserDTO>({
    email: 'house1',
    id: 'idsygfasd',
  });
  const [token, setToken] = useState<string>('');

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  const storageUserAndTokenSave = async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingUserStorageData(true);

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const userAndTokenUpdate = (userData: UserDTO, token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(userData);
  };

  const loadUserData = async () => {
    // try {
    //   setIsLoadingUserStorageData(true);
    //   const userLogged = await storageUserGet();
    //   const token = await storageAuthTokenGet();
    //   if (token && userLogged) {
    //     userAndTokenUpdate(userLogged, token);
    //   }
    // } catch (error) {
    //   throw error;
    // } finally {
    //   setIsLoadingUserStorageData(false);
    // }
  };

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const singIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, singIn, token, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
