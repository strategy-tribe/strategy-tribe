import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useGetApiUser } from '@/lib/hooks/apiUserHooks';

import AppLayout from '@/components/layouts/AppLayout';
import { ApiUserEdit } from '@/components/pages/apiUsers/ApiUserEdit';
import Loading from '@/components/utils/Loading';

import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import { PostApiUserParams } from '@/server/routes/apiUsers/postApiUser';

export const getStaticPaths: GetStaticPaths = async () => {
  const apiUsers = await prisma.apiUser.findMany({
    select: {
      id: true,
    },
  });
  const ids = apiUsers.reduce((acc, curr) => {
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

const ApiUserEditPage: NextPageWithLayout<{ id: string }> = ({
  id,
}: {
  id: string;
}) => {
  const { isLoading, apiUser } = useGetApiUser(id);
  const [apiUserFetch, setApiUserFetch] = useState<PostApiUserParams>({
    id: '',
    name: '',
    token: '',
    tags: [],
    isActive: false,
  });

  useEffect(() => {
    if (apiUser && apiUserFetch.id === '') {
      setApiUserFetch({
        ...apiUser,
        tags: apiUser.tags.map((tag) => tag.name),
      });
    }
  }, [apiUser]);

  return (
    <>
      <Head>
        <title>Edit ApiUser</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
        OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {apiUser && (
        <ApiUserEdit apiUser={apiUserFetch} setApiUser={setApiUserFetch} />
      )}
      {!apiUser && !isLoading && <div>Invalid report id</div>}
      {isLoading && <Loading small />}
    </>
  );
};

export default ApiUserEditPage;
ApiUserEditPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
