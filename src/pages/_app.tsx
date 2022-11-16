import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode } from 'react';
import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import '../styles/globals.css';

import PushNotificationsProvider from '@/lib/onesignal/PushNotifsContext';
import { trpc } from '@/lib/trpc';

import { NotificationsProvider as NotificationContextProvider } from '@/components/notifications/NotificationContext';

import AuthProvider from '@/auth/AuthContext';

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

export type NextPageWithLayout<T = Record<string, unknown>> = NextPage<T> & {
  getLayout?: (page: ReactElement, pageProps?: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const wagmiClient = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

const qc = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const onesignal_appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID as string;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0,minimum-scale=1.0"
        />
      </Head>
      <QueryClientProvider client={qc}>
        <WagmiConfig client={wagmiClient}>
          <SessionProvider session={(pageProps as any).session}>
            <NotificationContextProvider>
              <AuthProvider>
                <PushNotificationsProvider appId={onesignal_appId}>
                  {getLayout(<Component {...pageProps} />, pageProps)}
                </PushNotificationsProvider>
              </AuthProvider>
            </NotificationContextProvider>
          </SessionProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
}

export default trpc.withTRPC(MyApp);
