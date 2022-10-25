import { TargetType } from '@prisma/client';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { createContext, useContext, useMemo } from 'react';

interface AuthContextInterface {
  userId: string | undefined;
  isAuthenticated: boolean;
  LogIn: () => Promise<void>;
  LogOut: () => void;
  isStaff: boolean;
  isAdmin: boolean;
  isFetchingUserInfo: boolean;
  account: string | undefined;
  userInfo: UserInfo | undefined;
  balance: string | undefined;
}

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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore`;
const AuthContext = createContext<AuthContextInterface>();

/** Using this to abstract our Auth provider */
const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const { data, status } = useSession();
  signIn;

  const userInfo: UserInfo | undefined = useMemo(() => {
    if (!data) return undefined;
    return {
      isAdmin: data.user.rol === 'ADMIN',
      isStaff: data.user.rol === 'STAFF',
      mainWallet: data.user.address,
      userId: data.user.profileId,
      watching: [],
      wallets: [],
      joined: new Date(),
    };
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        userId: data?.user.profileId,
        isAuthenticated: status === 'authenticated',
        LogIn: signIn,
        LogOut: signOut,
        isStaff: data?.user.rol === 'STAFF',
        isAdmin: data?.user.rol === 'ADMIN',
        account: data?.user.address,
        userInfo,
        isFetchingUserInfo: status === 'loading',
        balance: 'user-balance-to-do',
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
