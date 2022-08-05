import Moralis from 'moralis';
import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';

import {
  UserInfo,
  useServerContext,
} from '@/lib/moralis/ServerContextProvider';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';

interface AuthContextInterface {
  userId: string | undefined;
  isAuthenticated: boolean;
  LogIn: () => Promise<void>;
  LogOut: () => void;
  isStaff: boolean;
  isAdmin: boolean;
  isFetchingUserInfo: boolean;
  account: string | null;
  userInfo: UserInfo | undefined;
  balance: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore`;
const AuthContext = createContext<AuthContextInterface>();

const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  //Abstraction
  const {
    userId,
    LogIn,
    LogOut,
    isAuthenticated,
    account,
    fetchUserInfo,
    isFetchingUserInfo,
  } = useServerContext();

  //Queries
  const { data: userInfo } = useQuery(
    [userId, 'userInfo'],
    () => fetchUserInfo(),
    {
      enabled: isAuthenticated && !!userId,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: Infinity,
    }
  );

  //notifications
  const { notify } = useNotification();

  const { data: balance } = useQuery(
    ['user balance', userInfo],
    async () => {
      if (!userInfo) return;
      return await getWalletMaticBalance();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  async function getWalletMaticBalance() {
    if (!userId || !userInfo) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore`;
    const { ethereum } = window;

    if (!ethereum) {
      notify(
        {
          title: "We could't connect to your wallet",
          content: () => 'Are you signed in in your wallet?',
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 15,
          type: NotificationType.Banner,
          delayType: DelayType.Time,
        }
      );
      return;
    }

    if (!isAuthenticated || !userInfo?.mainWallet || !ethereum) return;

    try {
      const ethers = Moralis.web3Library;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(userInfo.mainWallet);
      const balanceInEth = ethers.utils.formatEther(balance);
      return balanceInEth;
    } catch (error) {
      console.warn('error', error);
      notify(
        {
          title:
            "We could't connect to your wallet. Are you signed in in your wallet?",
          content: () => `Reason: ${error}`,
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 5,
          type: NotificationType.Banner,
          delayType: DelayType.Time,
        }
      );
      return;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userId,
        isAuthenticated,
        LogIn,
        LogOut,
        isStaff: userInfo?.isStaff || false,
        isAdmin: userInfo?.isAdmin || false,
        account,
        userInfo,
        isFetchingUserInfo,
        balance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//?Exports
export default AuthContextProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
