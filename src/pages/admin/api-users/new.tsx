('@/components/utils/Title');
import Head from 'next/head';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppLayout from '@/components/layouts/AppLayout';
import { ApiUserEdit } from '@/components/pages/apiUsers/ApiUserEdit';

import { NextPageWithLayout } from '@/pages/_app';
import { PostApiUserParams } from '@/server/routes/apiUsers/postApiUser';

('@/components/utils/Title');

const NewApiUserPage: NextPageWithLayout = () => {
  const [apiUser, setApiUser] = useState<PostApiUserParams>({
    id: '',
    name: '',
    token: uuidv4(),
    tags: [],
    isActive: false,
  });

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>New ApiUser</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApiUserEdit apiUser={apiUser} setApiUser={setApiUser} />
    </div>
  );
};

export default NewApiUserPage;
NewApiUserPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
