import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GoTo404Page } from '../utils/Routes';

type UserID = string;

export const useBanRegularUsers = (options?: { include?: UserID }) => {
  const router = useRouter();
  const { isStaff, isAdmin, isFetchingUserInfo, userInfo } = useAuth();

  const isExceptionUser = options?.include
    ? userInfo?.userId === options?.include
    : false;

  const hasPermissions = isAdmin || isStaff || isExceptionUser;
  useEffect(() => {
    if (!isFetchingUserInfo && !hasPermissions) {
      router.push(GoTo404Page());
    }
  }, [router, userInfo]);
};
