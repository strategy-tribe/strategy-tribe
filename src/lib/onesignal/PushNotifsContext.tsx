import { createContext, useContext, useState } from 'react';
import OneSignal from 'react-onesignal';
import { useQuery } from 'react-query';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';

import { useAuth } from '@/auth/AuthContext';

import {
  addSubscriber,
  addSubscriberToAll,
  isSubscribed,
  isSubscribedToAll,
  removeSubscriber,
  removeSubscriberFromAll,
} from './methods';

interface PushNotifsContextInterface {
  initialized: boolean | undefined;
  activateNotifs: () => void;
  areNotifsEnabled: () => Promise<boolean>;
  subscribeToOrg: (userId: string, orgName: string) => Promise<any | undefined>;
  unsubscribeToOrg: (
    userId: string,
    orgName: string
  ) => Promise<any | undefined>;
  isSubscribed: (userId: string, orgName: string) => Promise<boolean>;
  isSubscribedToAll: (userId: string) => Promise<boolean>;
  subscribeToAllOrgs: (userId: string) => Promise<any | undefined>;
  unsubscribeFromAllOrgs: (userId: string) => Promise<any | undefined>;
}

const PushNotifsContext = createContext<PushNotifsContextInterface>({
  initialized: undefined,
  activateNotifs: () => {
    return;
  },
  areNotifsEnabled: async () => false,
  subscribeToOrg: async () => {
    return { success: false };
  },
  unsubscribeToOrg: async () => {
    return { success: false };
  },
  isSubscribed: async () => {
    return false;
  },
  isSubscribedToAll: async () => {
    return false;
  },
  subscribeToAllOrgs: async () => {
    return { success: false };
  },
  unsubscribeFromAllOrgs: async () => {
    return { success: false };
  },
});

export default function PushNotifsContextProvider({
  children,
  appId,
}: {
  appId: string;
  children: React.ReactNode;
}) {
  //*state
  const [initialized, setInitialized] = useState<boolean | undefined>();

  async function initializeOneSignal() {
    try {
      if (initialized) return;
      await OneSignal.init({ appId });
      setInitialized(true);
    } catch (error) {
      console.warn(`Error initializing OneSignal`, error);
      setInitialized(false);
    }
  }

  useQuery('Initialize OneSignal', initializeOneSignal, {
    enabled: !initialized,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  //*Notifications
  const { notify } = useNotification();

  //*User info
  const { LogIn } = useAuth();

  //*external
  async function activateNotifs() {
    await OneSignal.registerForPushNotifications();
  }

  async function subscribeToOrg(userId: string, orgName: string) {
    if (!userId) {
      notify(
        {
          title: 'Please sign in to get access to notifications and more',
          icon: 'warning',
          style: NotificationStyle.error,
          content: (onClose) => (
            <button
              onClick={() => {
                LogIn();
                onClose();
              }}
              className="label mt-4 text-on-surface-p0 underline"
            >
              <span>Join the hunt here</span>
            </button>
          ),
        },
        {
          condition: false,
          delayTime: 7,
          delayType: DelayType.Time,
          type: NotificationType.Banner,
        }
      );
      return;
    }
    const areNotifsOn = await OneSignal.isPushNotificationsEnabled();
    if (!areNotifsOn) {
      await activateNotifs();
    }
    const exUserId = await OneSignal.getExternalUserId();
    if (!exUserId) {
      try {
        await OneSignal.setExternalUserId(userId);
      } catch (error) {
        console.warn('could not register the user to one signal:', error);
        return;
      }
    }
    const serverResponse = await addSubscriber(userId, orgName);

    if (!serverResponse.success) {
      console.warn(
        'could not register the user to one signal: ',
        serverResponse.error
      );
      await OneSignal.removeExternalUserId();
    }

    return serverResponse;
  }

  async function unsubscribeToOrg(userId: string, orgName: string) {
    return await removeSubscriber(userId, orgName);
  }

  return (
    <PushNotifsContext.Provider
      value={{
        initialized,
        activateNotifs,
        areNotifsEnabled: OneSignal.isPushNotificationsEnabled,
        subscribeToOrg,
        unsubscribeToOrg,
        isSubscribed,
        isSubscribedToAll,
        subscribeToAllOrgs: addSubscriberToAll,
        unsubscribeFromAllOrgs: removeSubscriberFromAll,
      }}
    >
      {children}
    </PushNotifsContext.Provider>
  );
}

export const usePushNotifs = () => {
  return useContext(PushNotifsContext);
};
