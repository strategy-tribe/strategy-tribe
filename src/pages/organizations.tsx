import { GetStaticProps } from 'next';
import Head from 'next/head';
import router from 'next/router';

import { overcomeSerialization } from '@/lib/utils/overcomeSerialization';
import { GoToOrganizationsPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { AllOrganizations } from '@/components/pages/organizations/AllOrganizations';
import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';
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
    revalidate: 60 * 5, //every 5 minutes
  };
};

const OrganizationsPage: NextPageWithLayout<{ orgs: SmallOrg[] }> = ({
  orgs,
}: {
  orgs: SmallOrg[];
}) => {
  const { userId, isAuthenticated } = useAuth();

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

      {isAuthenticated && !!userId && <AllOrganizations organizations={orgs} />}
      {(!isAuthenticated || !userId) && (
        <ImportantMessage
          message="You're not signed in."
          className="mx-auto w-full max-w-xs"
          content={
            <button
              onClick={() =>
                router.push(`${GoToOrganizationsPage()}?login=true`)
              }
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

export default OrganizationsPage;
OrganizationsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
