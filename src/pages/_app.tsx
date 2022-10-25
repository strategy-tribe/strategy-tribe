import AuthContextProvider from 'auth/AuthContext';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import '../styles/globals.css';

import PushNotifsContextProvider from '@/lib/onesignal/PushNotifsContext';

import { NotificationcontextProvider as NotificationContextProvider } from '@/components/notifications/NotificationContext';

export type NextPageWithLayout<T = Record<string, unknown>> = NextPage<T> & {
  getLayout?: (page: ReactElement, pageProps?: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const onesignal_appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0,minimum-scale=1.0"
        />
      </Head>
      <SessionProvider session={(pageProps as any).session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <NotificationContextProvider>
              <AuthContextProvider>
                <PushNotifsContextProvider appId={onesignal_appId as string}>
                  {getLayout(<Component {...pageProps} />, pageProps)}
                </PushNotifsContextProvider>
              </AuthContextProvider>
            </NotificationContextProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
