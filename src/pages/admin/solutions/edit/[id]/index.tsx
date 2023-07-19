import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import { SolutionEdit } from '@/components/pages/solution/SolutionEdit';

import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import {
  FullSolution,
  ServerGetSolution,
} from '@/server/routes/solutions/getSolution';
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

  const solution: FullSolution | null = await ServerGetSolution(
    prisma,
    {
      id,
    },
    true
  );

  return {
    props: {
      solution,
    },
    revalidate: 60 * 5, //every 5 minutes
  };
};

const SolutionEditPage: NextPageWithLayout<{ solution: FullSolution }> = ({
  solution,
}: {
  solution: FullSolution;
}) => {
  const [solutionFetch, setSolutionFetch] = useState<PostSolutionParams>({
    id: '',
    mermaid: '',
    content: '',
    publish: false,
    target: '',
  });

  useEffect(() => {
    if (solution) {
      setSolutionFetch({
        ...solution!,
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
      {!solution && <div>Invalid report id</div>}
    </>
  );
};

export default SolutionEditPage;
SolutionEditPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
