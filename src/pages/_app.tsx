import '../styles/globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import AuthContextProvider from 'auth/AuthContext';
import Head from 'next/head';
import { NotificationcontextProvider as NotificationContextProvider } from '@/components/notifications/NotificationContext';
import PushNotifsContextProvider from '@/lib/onesignal/PushNotifsContext';
import { NextPage } from 'next';
import { ReactElement, ReactNode, useState } from 'react';
import MoralisContext from '@/lib/moralis/MoralisContext';

export type NextPageWithLayout<T = {}> = NextPage<T> & {
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
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <NotificationContextProvider>
            <MoralisContext>
              <AuthContextProvider>
                <PushNotifsContextProvider appId={onesignal_appId as string}>
                  {getLayout(<Component {...pageProps} />, pageProps)}
                </PushNotifsContextProvider>
              </AuthContextProvider>
            </MoralisContext>
          </NotificationContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
