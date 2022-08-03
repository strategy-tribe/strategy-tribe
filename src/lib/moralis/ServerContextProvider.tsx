import { Moralis } from 'moralis';
import React, { createContext, useContext, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useQueryClient } from 'react-query';

import { CloudFunctionResponse } from '@/lib/moralis/utils/CloudFunctionResponse';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import Icon, { IconSize } from '@/components/utils/Icon';

import { TargetType } from '../models/targetType';

export type Subscription = {
  name: string;
  id: string;
  type: TargetType;
};

export type UserInfo = {
  userId: string;
  mainWallet: string;
  wallets: string[];
  email?: string;
  joined: Date;
  watching?: Subscription[];
  isAdmin: boolean;
  isStaff: boolean;
};

interface ServerContextInterface {
  userId: string | undefined;
  LogIn: () => Promise<void>;
  LogOut: () => void;
  isAuthenticated: boolean;
  account: string | null;
  fetchUserInfo(): Promise<UserInfo | undefined>;
  isFetchingUserInfo: boolean;
  isInitialized: boolean;
}

const ServerContext = createContext<ServerContextInterface>({
  userId: undefined,
  LogIn: async () => {
    return;
  },
  LogOut: () => {
    return;
  },
  isAuthenticated: false,
  account: null,
  fetchUserInfo: async () => undefined,
  isFetchingUserInfo: true,
  isInitialized: false,
});

const ServerContextProvider = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  //*State
  const {
    authenticate,
    isAuthenticated,
    user,
    logout,
    account,
    isInitialized,
  } = useMoralis();

  const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(false);

  const queryClient = useQueryClient();

  //*Notifications
  const { notify } = useNotification();

  async function fetchUserInfo() {
    if (!isInitialized) return;

    if (!isAuthenticated || !user?.id) {
      console.warn('User is not authenticated');
      return;
    }
    setIsFetchingUserInfo(true);

    const response: CloudFunctionResponse = await Moralis.Cloud.run(
      'getUserInfo',
      {
        userId: user?.id,
      }
    );

    setIsFetchingUserInfo(false);
    if (response.error) {
      console.warn(`Error from server: ${response.error}`);
    } else {
      return response.data as UserInfo;
    }
  }

  async function LogIn() {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      authenticate({
        signingMessage:
          'Connect your wallet and join the hunt at StrategyTribe',
      })
        .then(function (user) {
          if (!user) {
            throw 'Nope';
          }
          queryClient.invalidateQueries();
        })
        .catch(function () {
          notify(
            {
              title: 'We could not connect to your wallet.',
              icon: 'warning',
              style: NotificationStyle.error,
              content: () => (
                <div>
                  <p>
                    Please install MetaMask, is a simple and secure way to
                    connect to blockchain-based applications.
                  </p>
                  <br />
                  <div className="flex gap-2 items-center">
                    <Icon icon="arrow_forward" size={IconSize.Small} />

                    <a
                      className="underline hover:text-bg label"
                      href="https://metamask.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      You can learn more here.
                    </a>
                  </div>
                </div>
              ),
            },
            {
              condition: false,
              delayTime: 15,
              delayType: DelayType.Time,
              type: NotificationType.Banner,
            }
          );
        });
    }
  }

  async function LogOut() {
    queryClient.invalidateQueries();
    await logout();
  }

  return (
    <ServerContext.Provider
      value={{
        userId: user?.id,
        LogIn,
        LogOut,
        isAuthenticated,
        account,
        fetchUserInfo,
        isFetchingUserInfo: isInitialized ? isFetchingUserInfo : true,
        isInitialized,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

//?Exports
export default ServerContextProvider;
export const useServerContext = () => {
  return useContext(ServerContext);
};
