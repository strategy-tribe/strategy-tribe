import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { useGetBounty } from '@/lib/hooks/bountyHooks';

import AppLayout from '@/components/layouts/AppLayout';
import Loading from '@/components/utils/Loading';

import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import {
  FullBounty,
  ServerGetBounty,
} from '@/server/routes/bounties/getBounty';

const Bounty = dynamic(import('@/components/pages/bounty/Bounty'), {
  ssr: false,
});

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
      slug,
    },
    revalidate: 60 * 5, //every 5 minutes
  };
};

const BountyPage: NextPageWithLayout<{ slug: string }> = ({
  slug,
}: {
  slug: string;
}) => {
  const { isLoading, bounty } = useGetBounty(slug);
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

      {isLoading && <Loading small />}
      {!isLoading && bounty && <Bounty bounty={bounty as FullBounty} />}
    </>
  );
};

export default BountyPage;
BountyPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
