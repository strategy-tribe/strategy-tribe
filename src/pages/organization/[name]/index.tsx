import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import router from 'next/router';

import AppLayout from '@/components/layouts/AppLayout';
import { Organization } from '@/components/pages/organization/Organization';
import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';
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
    revalidate: 60 * 5, //every 5 minutes
  };
};

const OrganizationPage: NextPageWithLayout<{ org: FullOrg }> = ({
  org,
}: {
  org: FullOrg;
}) => {
  //*Router
  const { userId, isAuthenticated } = useAuth();

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

      {isAuthenticated && !!userId && <Organization org={org} />}
      {(!isAuthenticated || !userId) && (
        <ImportantMessage
          message="You're not signed in."
          className="mx-auto w-full max-w-xs"
          content={
            <button
              onClick={() => router.push(`${router.asPath}?login=true`)}
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

export default OrganizationPage;
OrganizationPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
