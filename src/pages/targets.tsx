import { GetStaticProps } from 'next';
import Head from 'next/head';

import { overcomeSerialization } from '@/lib/utils/overcomeSerialization';

import AppLayout from '@/components/layouts/AppLayout';
import { AllTargets } from '@/components/pages/targets/AllTargets';

import prisma from '@/server/prisma/prismaClient';
import { _getTargets, SmallTarget } from '@/server/routes/targets/getTargets';

import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps = async () => {
  const targets = await _getTargets(prisma);
  return {
    props: {
      targets: overcomeSerialization(targets),
    },
  };
};

const TargetsPage: NextPageWithLayout<{ targets: SmallTarget[] }> = ({
  targets,
}: {
  targets: SmallTarget[];
}) => {
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

      <AllTargets targets={targets} />
    </>
  );
};

export default TargetsPage;
TargetsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
