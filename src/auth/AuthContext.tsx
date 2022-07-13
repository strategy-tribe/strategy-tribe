import React, { useContext, createContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNotification } from '@/components/notifications/NotificationContext';
import {
  DelayType,
  NotificationType,
} from '@/components/notifications/iNotification';
import Link from 'next/link';
import { GoToAboutusPage } from '@/utils/Routes';
import {
  UserInfo,
  useServerContext,
} from '@/lib/moralis/ServerContextProvider';

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
}

const AuthContext = createContext<AuthContextInterface>({
  userId: undefined,
  isAuthenticated: false,
  LogIn: async () => {},
  LogOut: () => {},
  isStaff: false,
  isAdmin: false,
  isFetchingUserInfo: false,
  account: null,
  userInfo: undefined,
});

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

  useEffect(() => {
    if (isAuthenticated) {
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
