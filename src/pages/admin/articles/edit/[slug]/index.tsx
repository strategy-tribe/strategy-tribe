import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useGetArticle } from '@/lib/hooks/articleHooks';

import AppLayout from '@/components/layouts/AppLayout';
import { ArticleEdit } from '@/components/pages/article/ArticleEdit';
import Loading from '@/components/utils/Loading';

import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import { PostArticleParams } from '@/server/routes/articles/postArticle';

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await prisma.article.findMany({
    select: {
      slug: true,
    },
  });
  const slugs = articles.reduce((acc, curr) => {
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

  return {
    props: {
      slug,
    },
    revalidate: 60 * 5, //every 5 minutes
  };
};

const ArticlePage: NextPageWithLayout<{ slug: string }> = ({
  slug,
}: {
  slug: string;
}) => {
  const { isLoading, article } = useGetArticle(slug);
  const [articleFetch, setArticleFetch] = useState<PostArticleParams>({
    id: '',
    slug: '',
    title: '',
    thumbnail: '',
    summary: '',
    content: '',
    publish: false,
    targets: [],
  });

  useEffect(() => {
    if (!isLoading && article) {
      setArticleFetch({
        ...article!,
        targets: article?.targets.map((t) => t.name) ?? [],
      });
    }
  }, [slug]);

  return (
    <>
      <Head>
        <title>Edit Article</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
        OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <Loading small />}
      {!isLoading && article && (
        <ArticleEdit article={articleFetch} setArticle={setArticleFetch} />
      )}
      {!isLoading && !article && <div>Invalid report id</div>}
    </>
  );
};

export default ArticlePage;
ArticlePage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
