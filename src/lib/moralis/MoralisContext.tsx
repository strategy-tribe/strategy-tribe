import React from 'react';
import { MoralisProvider } from 'react-moralis';
import ServerContextProvider from './ServerContextProvider';

export default function MoralisContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const moralis_serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const moralis_appId = process.env.NEXT_PUBLIC_APP_ID;

  return (
    <MoralisProvider
      serverUrl={moralis_serverUrl as string}
      appId={moralis_appId as string}
    >
      <ServerContextProvider>{children}</ServerContextProvider>
    </MoralisProvider>
  );
}
