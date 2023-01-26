import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { Bounty } from '@/components/pages/bounty/Bounty';

import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import {
  FullBounty,
  ServerGetBounty,
} from '@/server/routes/bounties/getBounty';

export const getStaticPaths: GetStaticPaths = async () => {
  const bounties = await prisma.bounty.findMany({
    select: {
      slug: true,
    },
  });
  const slugs = bounties.reduce((acc, curr) => {
    return acc.concat({
      params: {
        slug: curr.slug,
      },
    });
  }, [] as { params: { slug: string } }[]);

  return {
    paths: slugs,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    console.error('no slug detected, returning 404');
    return {
      notFound: true,
    };
  }

  const bounty: FullBounty | null = await ServerGetBounty(prisma, {
    slug,
  });

  if (!bounty) {
    console.error(`not bounty found for ${slug}, returning 404`);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      bounty: JSON.parse(JSON.stringify(bounty)),
      revalidate: 60 * 5, //every 5 minutes
    },
  };
};

const BountyPage: NextPageWithLayout<{ bounty: FullBounty }> = ({
  bounty,
}: {
  bounty: FullBounty;
}) => {
  return (
    <>
      <Head>
        <title>Bounty</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
        OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Bounty bounty={bounty} />
    </>
  );
};

export default BountyPage;
BountyPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
