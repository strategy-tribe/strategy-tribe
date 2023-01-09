import { GetStaticProps } from 'next';
import Head from 'next/head';

import { overcomeSerialization } from '@/lib/utils/overcomeSerialization';

import AppLayout from '@/components/layouts/AppLayout';
import { AllOrganizations } from '@/components/pages/organizations/AllOrganizations';

import prisma from '@/server/prisma/prismaClient';
import {
  getOrganizationsWithMetaData,
  SmallOrg,
} from '@/server/routes/organizations/getOrgs';

import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps = async () => {
  const orgs = await getOrganizationsWithMetaData(prisma);
  return {
    props: {
      orgs: overcomeSerialization(orgs),
    },
  };
};

const OrganizationsPage: NextPageWithLayout<{ orgs: SmallOrg[] }> = ({
  orgs,
}: {
  orgs: SmallOrg[];
}) => {
  return (
    <>
      <Head>
        <title>Organizations</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AllOrganizations organizations={orgs} />
    </>
  );
};

export default OrganizationsPage;
OrganizationsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
