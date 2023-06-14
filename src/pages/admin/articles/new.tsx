('@/components/utils/Title');
import Head from 'next/head';
import { useState } from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import { ArticleEdit } from '@/components/pages/article/ArticleEdit';

import { NextPageWithLayout } from '@/pages/_app';
import { PostArticleParams } from '@/server/routes/articles/postArticle';

('@/components/utils/Title');

const NewArticlePage: NextPageWithLayout = () => {
  const [article, setArticle] = useState<PostArticleParams>({
    id: '',
    slug: '',
    title: '',
    thumbnail: '',
    summary: '',
    content: '',
    publish: false,
    targets: [],
  });

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>New Article</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ArticleEdit article={article} setArticle={setArticle} />
    </div>
  );
};

export default NewArticlePage;
NewArticlePage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
