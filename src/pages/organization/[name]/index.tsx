import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { Organization } from '@/components/pages/organization/Organization';

import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import { FullOrg, ServerGetOrg } from '@/server/routes/organizations/getOrg';

export const getStaticPaths: GetStaticPaths = async () => {
  const orgs = await prisma.organization.findMany({
    select: {
      name: true,
    },
  });
  const names = orgs.reduce((acc, curr) => {
    return acc.concat({
      params: {
        name: encodeURI(curr.name),
      },
    });
  }, [] as { params: { name: string } }[]);

  return {
    paths: names,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = decodeURI(params?.name as string);

  if (!name) {
    console.error('no name detected, returning 404');
    return {
      notFound: true,
    };
  }

  const org: FullOrg | null = await ServerGetOrg(prisma, {
    name,
  });

  if (!org) {
    console.error(`not org found for ${name}, returning 404`);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      org: JSON.parse(JSON.stringify(org)),
    },
  };
};

const OrganizationPage: NextPageWithLayout<{ org: FullOrg }> = ({
  org,
}: {
  org: FullOrg;
}) => {
  //*Router

  //*Queries

  return (
    <>
      <Head>
        <title>Organization</title>
        <meta
          name="description"
          content="An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Organization org={org} />
    </>
  );
};

export default OrganizationPage;
OrganizationPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
