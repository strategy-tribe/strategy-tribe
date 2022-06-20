import { useRouter } from 'next/router';

export function useIsInApp() {
  const router = useRouter();
  return router.pathname.includes('/app');
}
