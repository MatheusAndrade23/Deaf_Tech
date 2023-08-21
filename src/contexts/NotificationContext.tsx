// @ts-nocheck
import { createContext, ReactNode, useEffect } from 'react';
import { useToast } from 'native-base';

import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';

import OneSignal from 'react-native-onesignal';

import { ONESIGNAL_APP_ID } from '@env';
import { AppError } from '@utils/AppError';

interface NotificationContextType {}

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationContext = createContext({} as NotificationContextType);

OneSignal.setAppId(ONESIGNAL_APP_ID);
// OneSignal.setEmail('house1@email.com');

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((data) => {
      const device = data.notification.additionalData;

      try {
        api.post('/api/deviceAnswered', {
          email: user.email,
          deviceId: device.id,
        });
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError
          ? error.message
          : 'Não foi possível receber os dispositivos. Tente Novamente!';

        if (isAppError) {
          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.middle',
          });
        }
      }
    });

    return () => unsubscribe;
  }, []);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};
