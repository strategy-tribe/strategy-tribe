import { TargetType } from '@prisma/client';
import { signOut, useSession } from 'next-auth/react';
import React, { createContext, useContext, useMemo } from 'react';

import { useGetBalance } from '@/lib/hooks/useGetBalance';
import { useSignIn } from '@/lib/useSignIn';

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
  address: string;
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
const AuthProvider = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const { data, status } = useSession();

  const { signIn } = useSignIn();

  const { balance } = useGetBalance(
    { address: data?.user.address ?? '' },
    {
      enabled: status === 'authenticated',
    }
  );

  const userInfo: UserInfo = useMemo(() => {
    if (!data)
      return {
        isAdmin: false,
        isStaff: false,
        address: '',
        userId: '',
        watching: [],
        joined: new Date(),
      };
    return {
      isAdmin: data.user.rol === 'ADMIN',
      isStaff: data.user.rol === 'STAFF',
      address: data.user.address,
      userId: data.user.id,
      watching: [],
      joined: data.user.joined,
    };
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        userId: data?.user.id,
        isAuthenticated: status === 'authenticated',
        LogIn: signIn,
        LogOut: signOut,
        isStaff: data?.user.rol === 'STAFF',
        isAdmin: data?.user.rol === 'ADMIN',
        account: data?.user.address,
        userInfo,
        isFetchingUserInfo: status === 'loading',
        balance: balance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//?Exports
export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
