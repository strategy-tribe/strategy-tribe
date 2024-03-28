('@/components/utils/Title');
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { UserList } from '@/components/pages/admin/users/UserList';
import Loading from '@/components/utils/Loading';
import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';

import { NextPageWithLayout } from '../_app';

const UsersPage: NextPageWithLayout = () => {
  const { isAdmin, isFetchingUserInfo } = useAuth();

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>Users</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto min-h-screen max-w-7xl space-y-8 p-4">
        {isFetchingUserInfo && <Loading small />}
        {!isFetchingUserInfo && isAdmin && <UserList />}
        {!isFetchingUserInfo && !isAdmin && (
          <ImportantMessage message="Unauthorized" />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
UsersPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
