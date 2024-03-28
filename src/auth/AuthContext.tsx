import { TargetType } from '@prisma/client';
import { signOut, useSession } from 'next-auth/react';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
} from 'react';
import { useDisconnect } from 'wagmi';

import { useGetBalance } from '@/lib/hooks/useGetBalance';
import { useSignIn } from '@/lib/useSignIn';

import { WalletType } from '@/components/auth/ConnectWalletPopUp';

interface AuthContextInterface {
  userId: string | undefined;
  isAuthenticated: boolean;
  LogIn: (
    walletType: WalletType,
    setError: Dispatch<SetStateAction<string | undefined>>
  ) => Promise<void>;
  LogOut: () => void;
  isStaff: boolean;
  isAdmin: boolean;
  isAssociate: boolean;
  isDataDumpUser: boolean;
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
  isAssociate: boolean;
  isDataDumpUser: boolean;
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

  const { disconnectAsync } = useDisconnect();
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
        isAssociate: false,
        isDataDumpUser: false,
        address: '',
        userId: '',
        watching: [],
        joined: new Date(),
      };
    return {
      isAdmin: data.user.rol === 'ADMIN',
      isStaff: data.user.rol === 'STAFF',
      isAssociate: data.user.rol === 'ASSOCIATE',
      isDataDumpUser: data.user.rol === 'DATADUMPUSER',
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
        LogOut: async () => {
          await disconnectAsync();
          signOut();
        },
        isStaff: data?.user.rol === 'STAFF',
        isAdmin: data?.user.rol === 'ADMIN',
        isAssociate: data?.user.rol === 'ASSOCIATE',
        isDataDumpUser: data?.user.rol === 'DATADUMPUSER',
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
