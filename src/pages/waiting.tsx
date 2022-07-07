import AppLayout from '@/components/layouts/AppLayout';
import { BountyEntry } from '@/components/utils/BountyEntry';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import Loading from '@/components/utils/Loading';
import { useGetBounties } from '@/hooks/bountyHooks';
import { Order, BountyOrderBy } from '@/lib/models/queryParams';
import { BountyState } from '@/lib/models/status';
import Head from 'next/head';
import { useAuth } from 'auth/AuthContext';
import { NextPageWithLayout } from '../_app';

const WaitingForFunds: NextPageWithLayout = () => {
  const { userId, isStaff } = useAuth();

  const { bounties, isLoading } = useGetBounties(
    {
      order: Order.Desc,
      states: [BountyState.WaitingForFunds],
      orderBy: BountyOrderBy.CreatedAt,
    },
    undefined,
    !!userId && isStaff
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>ST | Waiting for funds</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="space-y-4 max-w-5xl mx-auto">
        <Title
          title="Bounties waiting for funds"
          extraInfo={`${bounties?.length} bounties`}
        />
        <div className="space-y-8">
          {bounties?.map((p, i) => {
            return <BountyEntry bounty={p} key={i} />;
          })}
        </div>
      </div>
    </>
  );
};

export default WaitingForFunds;
WaitingForFunds.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
