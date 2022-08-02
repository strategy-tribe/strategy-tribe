import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { GoTo404Page } from '../utils/Routes';

export const useIsValidView = (
  validValues: string[],
  redirect = GoTo404Page(),
  key = 'view'
) => {
  const router = useRouter();

  useEffect(() => {
    const urlQuery = router.query;
    const value = urlQuery[key] as string;

    if (value && !validValues.includes(value)) {
      router.push(redirect);
    }
  }, [router, redirect, validValues, key]);
};
