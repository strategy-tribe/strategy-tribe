import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import OneSignal from 'react-onesignal';

import { useAuth } from '@/auth/AuthContext';

/** Checks if the user is linked to OneSignal*/
export const useRegisterUser = (
  isOneSignalInitialized: boolean | undefined
) => {
  const { userId } = useAuth();

  useEffect(() => {
    async function registerUserToOneSignal(userId: string) {
      const externalUserId = await OneSignal.getExternalUserId();

      //user is already registered
      if (externalUserId) return;

      try {
        await OneSignal.setExternalUserId(userId);
      } catch (error) {
        console.error('could not register the user to one signal:', error);
        return;
      }
    }
    async function check() {
      if (isOneSignalInitialized && userId)
        await registerUserToOneSignal(userId);
    }
    check();
  }, [userId, isOneSignalInitialized]);
};

export const useInitializeOneSignal = (appId: string) => {
  const [initialized, setInitialized] = useState<boolean | undefined>();

  useQuery(
    ['Initialize OneSignal'],
    async () => {
      async function initializeOneSignal(): Promise<boolean> {
        try {
          if (initialized) return false;
          await OneSignal.init({ appId });
          return true;
        } catch (error) {
          console.warn(`Error initializing OneSignal`, error);
          return false;
        }
      }
      const res = await initializeOneSignal();
      setInitialized(res);
      return true;
    },
    {
      enabled: !initialized,
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  return {
    /** `true` if one signal is ready  */
    initialized,
  };
};
