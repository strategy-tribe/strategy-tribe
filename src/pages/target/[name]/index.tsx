import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { Target } from '@/components/pages/target/Target';

import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import { _getTarget, FullTarget } from '@/server/routes/targets/getTarget';

export const getStaticPaths: GetStaticPaths = async () => {
  const targets = await prisma.target.findMany({
    select: {
      name: true,
    },
  });
  const names = targets.reduce((acc, curr) => {
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

  const target: FullTarget | null = await _getTarget(prisma, {
    name,
  });

  if (!target) {
    console.error(`not target found for ${name}, returning 404`);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      target: JSON.parse(JSON.stringify(target)),
    },
    revalidate: 60 * 5, //every 5 minutes
  };
};

const TargetPage: NextPageWithLayout<{ target: FullTarget }> = ({
  target,
}: {
  target: FullTarget;
}) => {
  //*Router

  //*Queries

  return (
    <>
      <Head>
        <title>Target</title>
        <meta
          name="description"
          content="An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Target target={target} />
    </>
  );
};

export default TargetPage;
TargetPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
