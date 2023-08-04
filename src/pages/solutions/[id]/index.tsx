import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { useGetSolution } from '@/lib/hooks/solutionHooks';

import AppLayout from '@/components/layouts/AppLayout';
import { Solution } from '@/components/pages/solution/Solution';
import Loading from '@/components/utils/Loading';

import { useAuth } from '@/auth/AuthContext';
import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import { FullSolution } from '@/server/routes/solutions/getSolution';

export const getStaticPaths: GetStaticPaths = async () => {
  const solutions = await prisma.solution.findMany({
    select: {
      id: true,
    },
  });
  const ids = solutions.reduce((acc, curr) => {
    return acc.concat({
      params: {
        id: curr.id,
      },
    });
  }, [] as { params: { id: string } }[]);

  return {
    paths: ids,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  if (!id) {
    console.error('no id detected, returning 404');
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
    },
    revalidate: 60 * 5, //every 5 minutes
  };
};

const SolutionPage: NextPageWithLayout<{ id: string }> = ({
  id,
}: {
  id: string;
}) => {
  const { isLoading, solution } = useGetSolution(id);
  const { userId, isAuthenticated } = useAuth();

  return (
    <>
      <Head>
        <title>Solution</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
        OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <Loading small />}
      {!isLoading && solution && (
        <Solution solution={solution as FullSolution} />
      )}
    </>
  );
};

export default SolutionPage;
SolutionPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
