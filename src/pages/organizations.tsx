import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { AllOrganizations } from '@/components/pages/organizations/AllOrganizations';

import { NextPageWithLayout } from './_app';

const OrganizationsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>ST | Organizations</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AllOrganizations />
    </>
  );
};

export default OrganizationsPage;
OrganizationsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
