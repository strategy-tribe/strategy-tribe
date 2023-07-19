import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import router from 'next/router';

import { useGetSolution } from '@/lib/hooks/solutionHooks';
import { GoToSolutionPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { Solution } from '@/components/pages/solution/Solution';
import Loading from '@/components/utils/Loading';
import { ImportantMessage } from '@/components/utils/Warning';

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
      {isAuthenticated && !!userId && !isLoading && solution && (
        <Solution solution={solution as FullSolution} />
      )}

      {(!isAuthenticated || !userId) && (
        <ImportantMessage
          message="You're not signed in."
          className="mx-auto w-full max-w-xs"
          content={
            <button
              onClick={() => router.push(`${GoToSolutionPage(id)}?login=true`)}
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

export default SolutionPage;
SolutionPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};