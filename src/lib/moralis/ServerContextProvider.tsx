import React, { useContext, createContext, useState } from 'react';
import { Moralis } from 'moralis';
import { useMoralis } from 'react-moralis';
import { useAuthChanged } from './utils/useAuthChanged';
import { CloudFunctionResponse } from '@/lib/moralis/utils/CloudFunctionResponse';
import { useNotification } from '@/components/notifications/NotificationContext';
import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { TargetType } from '../models/targetType';
import { useQueryClient } from 'react-query';

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
}

const ServerContext = createContext<ServerContextInterface>({
  userId: undefined,
  LogIn: async () => {},
  LogOut: () => {},
  isAuthenticated: false,
  account: null,
  fetchUserInfo: async () => undefined,
  isFetchingUserInfo: true,
});

//* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      console.error('User is not authenticated');
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
      console.error(`Error from server: ${response.error}`);
      return;
    } else {
      return response.data as UserInfo;
    }
  }

  async function LogIn() {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      authenticate({ signingMessage: 'Log in using Moralis' })
        .then(function (user) {
          if (!user) {
            throw 'Nope';
          }
          queryClient.invalidateQueries();
        })
        .catch(function (error) {
          notify(
            {
              title: 'We could not connect to your wallet.',
              icon: 'warning',
              style: NotificationStyle.error,
              content: (
                <div className="text-white">
                  <p>
                    Please install MetaMask, is a simple and secure way to
                    connect to blockchain-based applications.
                  </p>
                  <br />
                  <a
                    className="underline hover:text-black"
                    href="https://metamask.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    You can learn more here.
                  </a>
                </div>
              ),
            },
            {
              condition: false,
              delayTime: 7,
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
        isFetchingUserInfo: isFetchingUserInfo,
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
