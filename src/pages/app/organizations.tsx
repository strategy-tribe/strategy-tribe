import Head from 'next/head';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layouts/AppLayout';
import { AllOrganizations } from '@/components/pages/organizations/AllOrganizations';
import { GetStaticProps } from 'next';
import fs from 'fs';

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
