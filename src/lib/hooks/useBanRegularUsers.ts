import { useAuth } from 'auth/AuthContext';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { GoTo404Page } from '../utils/Routes';

export const useBanRegularUsers = () => {
  const router = useRouter();
  const { isStaff, isFetchingIsStaff } = useAuth();

  useEffect(() => {
    if (!isStaff && !isFetchingIsStaff) {
      router.push(GoTo404Page());
    }
  }, [router]);
};
