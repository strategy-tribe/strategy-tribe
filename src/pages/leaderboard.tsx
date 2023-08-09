import { GetStaticProps } from 'next';
import Head from 'next/head';

import { overcomeSerialization } from '@/lib/utils/overcomeSerialization';

import AppLayout from '@/components/layouts/AppLayout';
import { TopHunters } from '@/components/pages/leaderboard/TopHunters';

import prisma from '@/server/prisma/prismaClient';
import {
  _getLeaderboardUsers,
  LeaderboardUsers,
} from '@/server/routes/users/getLeaderboardUsers';

import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps = async () => {
  const users = await _getLeaderboardUsers(prisma);
  return {
    props: {
      users: overcomeSerialization(users),
    },
    revalidate: 60 * 5, //every 5 minutes
  };
};

const LeaderboardPage: NextPageWithLayout<{ users: LeaderboardUsers }> = ({
  users,
}: {
  users: LeaderboardUsers;
}) => {
  return (
    <>
      <Head>
        <title>Leaderboard</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopHunters users={users} />
    </>
  );
};

export default LeaderboardPage;
LeaderboardPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
