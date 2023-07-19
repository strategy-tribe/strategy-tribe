('@/components/utils/Title');
import Head from 'next/head';
import { useState } from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import { SolutionEdit } from '@/components/pages/solution/SolutionEdit';

import { NextPageWithLayout } from '@/pages/_app';
import { PostSolutionParams } from '@/server/routes/solutions/postSolution';

('@/components/utils/Title');

const NewSolutionPage: NextPageWithLayout = () => {
  const [solution, setSolution] = useState<PostSolutionParams>({
    id: '',
    mermaid: '',
    content: '',
    publish: false,
    target: '',
  });

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>New Solution</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SolutionEdit solution={solution} setSolution={setSolution} />
    </div>
  );
};

export default NewSolutionPage;
NewSolutionPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
