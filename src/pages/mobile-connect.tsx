import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';

import { useSignIn } from '@/lib/useSignIn';
import { GoToLandingPage } from '@/lib/utils/Routes';

import { WalletType } from '@/components/auth/ConnectWalletPopUp';
import { LandingPageLink } from '@/components/layouts/navbar/LandingPageLink';

export default function ConnectMobile() {
  const { signIn } = useSignIn();
  const [walletType, setWalletType] = useState<WalletType>();

  const goHome = () => {
    router.push(GoToLandingPage());
    return;
  };

  useEffect(() => {
    if (!walletType && router.query.walletType) {
      setWalletType(router.query.walletType as WalletType);
    }
  });

  useEffect(() => {
    if (walletType) {
      signIn(walletType, (e: string) => goHome());
    }
  }, [walletType]);

  return (
    <>
      <Head>
        <title>ST | Bounty</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
                OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full">
        <div className="absolute top-[35%] left-[15%] items-center rounded-2xl border-2 border-main p-10">
          <h1 className="flex justify-center text-lg">
            Connecting to {walletType}
          </h1>
          <div className="p-10">
            <LandingPageLink />
          </div>
        </div>
      </div>
    </>
  );
}
