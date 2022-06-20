import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export const useAuthChanged = async (callback: (isAuth: boolean) => void) => {
  const { isAuthenticated } = useMoralis();
  useEffect(() => {
    callback(isAuthenticated);
  }, [isAuthenticated]);
};
