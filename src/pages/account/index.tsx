import { useAuth } from 'auth/AuthContext';
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { Account } from '@/components/pages/account/Account';
import { ImportantMessage } from '@/components/utils/Warning';

import { NextPageWithLayout } from '@/pages/_app';

const UserPage: NextPageWithLayout = () => {
  const { userId, isAuthenticated, LogIn } = useAuth();

  return (
    <>
      <Head>
        <title>ST | User Submissions</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        {isAuthenticated && !!userId && <Account />}
        {(!isAuthenticated || !userId) && (
          <ImportantMessage
            message="You're not signed in."
            className="mx-auto w-full max-w-xs"
            content={
              <button onClick={LogIn} className="label mt-4">
                Join the hunt,
                <br />
                <span className="underline">you only need your wallet</span>
              </button>
            }
          />
        )}
      </>
    </>
  );
};

export default UserPage;
UserPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
