import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useGetRawSolution } from '@/lib/hooks/solutionHooks';

import AppLayout from '@/components/layouts/AppLayout';
import { SolutionEdit } from '@/components/pages/solution/SolutionEdit';
import Loading from '@/components/utils/Loading';

import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import { PostSolutionParams } from '@/server/routes/solutions/postSolution';

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
    revalidate: 60 * 2, //every 2 minutes
  };
};

const SolutionEditPage: NextPageWithLayout<{ id: string }> = ({
  id,
}: {
  id: string;
}) => {
  const { isLoading, solution } = useGetRawSolution(id);
  const [solutionFetch, setSolutionFetch] = useState<PostSolutionParams>({
    pieCode: '',
    flowCode: '',
    content: '',
    publish: false,
    target: '',
  });

  useEffect(() => {
    if (solution) {
      setSolutionFetch({
        ...solution,
        target: solution.target.name,
      });
    }
  }, [solution]);

  return (
    <>
      <Head>
        <title>Edit Solution</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
        OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {solution && (
        <SolutionEdit solution={solutionFetch} setSolution={setSolutionFetch} />
      )}
      {!solution && !isLoading && <div>Invalid report id</div>}
      {isLoading && <Loading small />}
    </>
  );
};

export default SolutionEditPage;
SolutionEditPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
