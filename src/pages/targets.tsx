import { GetStaticProps } from 'next';
import Head from 'next/head';
import router from 'next/router';

import { overcomeSerialization } from '@/lib/utils/overcomeSerialization';
import { GoToTargetsPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { AllTargets } from '@/components/pages/targets/AllTargets';
import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';
import prisma from '@/server/prisma/prismaClient';
import { _getTargets, SmallTarget } from '@/server/routes/targets/getTargets';

import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps = async () => {
  const targets = await _getTargets(prisma);
  return {
    props: {
      targets: overcomeSerialization(targets),
    },
    revalidate: 60 * 5, //every 5 minutes
  };
};

const TargetsPage: NextPageWithLayout<{ targets: SmallTarget[] }> = ({
  targets,
}: {
  targets: SmallTarget[];
}) => {
  const { userId, isAuthenticated } = useAuth();

  return (
    <>
      <Head>
        <title>Targets</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuthenticated && !!userId && <AllTargets targets={targets} />}
      {(!isAuthenticated || !userId) && (
        <ImportantMessage
          message="You're not signed in."
          className="mx-auto w-full max-w-xs"
          content={
            <button
              onClick={() => router.push(`${GoToTargetsPage()}?login=true`)}
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
  );
};

export default TargetsPage;
TargetsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
