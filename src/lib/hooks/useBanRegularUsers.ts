import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { useNotification } from '@/components/notifications/NotificationContext';

import { useAuth } from '@/auth/AuthContext';

import { GoTo404Page } from '../utils/Routes';

type UserID = string;

export const useBanRegularUsers = (options?: { allowedUsers?: UserID[] }) => {
  const router = useRouter();
  const { isStaff, isAdmin, isFetchingUserInfo, userInfo } = useAuth();

  const isExceptionUser = options?.allowedUsers
    ? options?.allowedUsers?.find((id) => id === userInfo?.userId)
    : false;

  const hasPermissions = isAdmin || isStaff || isExceptionUser;

  const [passes, setPasses] = useState(false);

  function check() {
    if (!hasPermissions && !isFetchingUserInfo) {
      throw new Error('User has no permissions');
    }
  }

  const { notify } = useNotification();

  useQuery(
    ['check permissions', hasPermissions, isFetchingUserInfo, options],
    () => check(),
    {
      onSuccess: () => setPasses(true),
      onError: (error) => {
        setPasses(false);
        notify({ title: 'Error', content: `${error}` });
        router.push(GoTo404Page());
      },
      retry: 1,
      retryDelay: 1,
      useErrorBoundary: true,
    }
  );

  return passes;
};
