import Head from 'next/head';
import router from 'next/router';

import { GoToAccountPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { Account } from '@/components/pages/account/Account';
import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';
import { NextPageWithLayout } from '@/pages/_app';

const UserPage: NextPageWithLayout = () => {
  const { userId, isAuthenticated } = useAuth();

  return (
    <>
      <Head>
        <title>User Submissions</title>
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
              <button
                onClick={() => router.push(`${GoToAccountPage()}?login=true`)}
                className="label mt-4"
              >
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
