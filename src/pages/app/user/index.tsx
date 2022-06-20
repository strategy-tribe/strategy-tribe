import AppLayout from '@/components/layouts/AppLayout';
import Navbar from '@/components/navbar/Navbar';
import { ImportantMessage } from '@/components/utils/Warning';
import { NextPageWithLayout } from '@/pages/_app';
import Head from 'next/head';
import { useAuth } from 'auth/AuthContext';
import { UserDetails } from '@/components/pages/user/UserDetails';

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

      <Navbar
        setUp={{
          background: true,
          useBackArrow: false,
          useOverflowMenu: false,
          useMobileNavigation: true,
        }}
      >
        {isAuthenticated && !!userId && <UserDetails />}
        {(!isAuthenticated || !userId) && (
          <ImportantMessage
            message="You're not signed in."
            className="w-full mx-auto max-w-xs"
            content={
              <button onClick={LogIn} className="mt-4 label">
                Join the hunt,
                <br />
                <span className="underline">you only need your wallet</span>
              </button>
            }
          />
        )}
      </Navbar>
    </>
  );
};

export default UserPage;
UserPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
