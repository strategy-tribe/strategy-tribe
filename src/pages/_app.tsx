import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import '../styles/globals.css';

import { trpc } from '@/lib/trpc';

import AuthContextProvider from '@/auth/AuthContext';

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
      <WagmiConfig client={wagmiClient}>
        <SessionProvider session={(pageProps as any).session}>
          <QueryClientProvider client={queryClient}>
            {/* <Hydrate state={pageProps.dehydratedState}> */}
            {/* <NotificationContextProvider> */}
            <AuthContextProvider>
              {/* <PushNotifsContextProvider appId={onesignal_appId as string}> */}
              {getLayout(<Component {...pageProps} />, pageProps)}
              {/* </PushNotifsContextProvider> */}
            </AuthContextProvider>
            {/* </NotificationContextProvider> */}
            {/* </Hydrate> */}
          </QueryClientProvider>
        </SessionProvider>
      </WagmiConfig>
    </>
  );
}

export default trpc.withTRPC(MyApp);
