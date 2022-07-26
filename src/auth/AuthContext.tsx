import React, { useContext, createContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNotification } from '@/components/notifications/NotificationContext';
import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import Link from 'next/link';
import { GoToAboutusPage } from '@/utils/Routes';
import {
  UserInfo,
  useServerContext,
} from '@/lib/moralis/ServerContextProvider';
import { GetDateInString } from '@/lib/utils/DateHelpers';

import Moralis from 'moralis';

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

//@ts-ignore-line
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

  useEffect(() => {
    if (
      isAuthenticated &&
      userInfo &&
      !GetDateInString(userInfo?.joined).includes('second')
    ) {
      notify(
        { title: 'Welcome back', icon: '' },
        {
          condition: false,
          delayTime: 3,
          type: NotificationType.Banner,
          delayType: DelayType.Time,
        }
      );
    } else {
      notify(
        {
          title: 'Earn money, get notified of updates, and more by signing in',
          content: (
            <p>
              You can learn more{' '}
              <Link href={GoToAboutusPage()}>
                <a className="underline text-purpleLight font-medium">here</a>
              </Link>
            </p>
          ),
          icon: 'info',
        },
        {
          condition: false,
          delayTime: 5,
          type: NotificationType.Pill,
          delayType: DelayType.Time,
        }
      );
    }
  }, [isAuthenticated]);

  async function getWalletMaticBalance() {
    if (!userId || !userInfo) {
      return;
    }

    // @ts-ignore`;
    const { ethereum } = window;

    if (!ethereum) {
      // throw new Error("We could't connect to your wallet");
      notify(
        {
          title: "We could't connect to your wallet",
          content: 'Please install MetaMask',
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

    if (!isAuthenticated || !userInfo?.mainWallet || !ethereum) return;

    try {
      const ethers = Moralis.web3Library;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(userInfo.mainWallet);
      const balanceInEth = ethers.utils.formatEther(balance);
      return balanceInEth;
    } catch (error) {
      console.error('error', error);
      notify(
        {
          title: "We could't connect to your wallet",
          content: `Reason: ${error}`,
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
