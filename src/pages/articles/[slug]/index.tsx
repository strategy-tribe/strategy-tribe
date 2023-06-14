import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import router from 'next/router';

import { useGetArticle } from '@/lib/hooks/articleHooks';
import { GoToArticlePage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { Article } from '@/components/pages/article/Article';
import Loading from '@/components/utils/Loading';
import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';
import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import { FullArticle } from '@/server/routes/articles/getArticle';

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
  const { userId, isAuthenticated } = useAuth();

  return (
    <>
      <Head>
        <title>Article</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
        OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <Loading small />}
      {isAuthenticated && !!userId && !isLoading && article && (
        <Article article={article as FullArticle} />
      )}

      {(!isAuthenticated || !userId) && (
        <ImportantMessage
          message="You're not signed in."
          className="mx-auto w-full max-w-xs"
          content={
            <button
              onClick={() => router.push(`${GoToArticlePage(slug)}?login=true`)}
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

export default ArticlePage;
ArticlePage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
