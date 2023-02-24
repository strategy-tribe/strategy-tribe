('@/components/utils/Title');
import Head from 'next/head';
import { useState } from 'react';

import { useGetInfo } from '@/lib/hooks/userHooks';
import { BountyOrderBy } from '@/lib/models/BountyQueryParams';

import AppLayout from '@/components/layouts/AppLayout';
import { InfoItem } from '@/components/pages/admin/info/InfoItem';
import { ExploreFilters } from '@/components/pages/explore/filters/ExploreFilters';
import {
  BountiesFilter,
  BountiesFilterType,
  DEFAULT_FILTERS,
  FINGERPRINTS_FILTER,
} from '@/components/pages/explore/filters/utils/DefaultFilter';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';

import { useAuth } from '@/auth/AuthContext';
import { GetBountiesParams } from '@/server/routes/bounties/getBounties';

import { NextPageWithLayout } from '../_app';

const InfoPage: NextPageWithLayout = () => {
  const { isAdmin, isFetchingUserInfo } = useAuth();
  // const {
  //     urlFilter: { query },
  //     setUrlFilter,
  //   } = useExploreUrl();
  const [query, setQuery] = useState<BountiesFilter>({
    type: BountiesFilterType.Fingerprint,
    query: {
      orderBy: BountyOrderBy.Fingerprint,
      amount: 12,
    },
  });
  const {
    info,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
    count,
  } = useGetInfo(query.query, isAdmin && !isFetchingUserInfo);

  function removeCountry(country: string) {
    if (!query.query.countries?.includes(country)) return;
    else {
      const countries = query.query.countries?.filter(
        (c: string) => c !== country
      );
      setQuery({
        ...query,
        query: {
          ...query.query,
          countries:
            countries && countries.length === 0 ? undefined : countries,
          page: 0,
        },
      });
    }
  }

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>Info</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
            world's most important threat actors. We aim to centralize, organize
            and incentivise the collection of widely important data by
            individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-8xl mx-auto min-h-screen space-y-8 p-8">
        {/* <Filter */}
        <ExploreFilters
          urlFilter={query}
          setUrlFilter={(
            searchParams: GetBountiesParams,
            options?: {
              type?: BountiesFilterType;
              scroll?: boolean;
              url?: string;
            }
          ) => {
            setQuery({
              type: options?.type ?? query.type,
              query: { ...query.query, ...searchParams },
            });
          }}
          filters={[...DEFAULT_FILTERS, FINGERPRINTS_FILTER]}
          totalCount={count}
          countries={query.query.countries}
          removeCountry={removeCountry}
        />

        {isLoading && <Loading small />}

        <section className="grid grid-cols-3 gap-6">
          {info?.map((bounty, i) => {
            return <InfoItem bounty={bounty} key={i} />;
          })}
        </section>

        <PageControls
          sticky={false}
          config={{
            query: query.query,
            setQuery: (q) => {
              setQuery({
                type: query.type,
                query: q,
              });
            },
            numOfPages,
            currPage,
            hasNextPage,
            hasPreviousPage,
            isLoading,
          }}
        />
      </div>
    </div>
  );
};

export default InfoPage;
InfoPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
