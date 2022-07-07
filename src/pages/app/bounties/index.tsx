import AppLayout from '@/components/layouts/AppLayout';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Loading from '@/components/utils/Loading';
import { useGetBounties } from '@/hooks/bountyHooks';
import { Order, BountyOrderBy } from '@/lib/models/queryParams';
import { BountyState } from '@/lib/models/status';
import { TargetType } from '@/lib/models/targetType';
import { NextPageWithLayout } from '@/pages/_app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { BountyEntry } from '@/components/utils/BountyEntry';

const QueryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { title, orderBy, order, states, targetType, orgName } = router.query;

  const {
    bounties,
    isLoading,
    fetchNextPage: nextPage,
    isFetching,
    hasNextPage: hasMore,
  } = useGetBounties({
    amount: 12,
    orderBy: orderBy as BountyOrderBy,
    order: order as Order,
    states: states as BountyState[],
    targetType: targetType as TargetType,
    orgName: orgName as string,
    paginate: true,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>ST | Query</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
        <Title title={title as string} />
        <div className="space-y-8">
          {bounties?.map((p, i) => {
            return (
              <div key={i} className="flex gap-3 -translate-x-5">
                <span className="text-sm font-bold mt-1 text-disabled">
                  {i + 1}
                </span>
                <BountyEntry bounty={p} />
              </div>
            );
          })}
        </div>

        {hasMore && (
          <Button
            info={{
              className: 'mt-10 w-fit',
              onClick: nextPage,
              label: isFetching ? 'Loading' : 'More',
              style: ButtonStyle.Filled,
              icon: 'refresh',
              iconClasses: isFetching ? 'animate-spin' : '',
              disabled: isFetching,
            }}
          />
        )}

        {!hasMore && (
          <div className="mt-10 w-fit label text-disabled">
            You have reach the end.
          </div>
        )}
      </div>
    </>
  );
};

export default QueryPage;
QueryPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
