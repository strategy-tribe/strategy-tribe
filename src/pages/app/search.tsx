import AppLayout from '@/components/layouts/AppLayout';
import Navbar from '@/components/navbar/Navbar';
import { Searchbar } from '@/components/pages/search/Searchbar';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { BountyEntry } from '@/components/utils/BountyEntry';
import { OrgEntry } from '@/components/pages/organizations/OrgEntry';
import { ImportantMessage } from '@/components/utils/Warning';
import { useAuth } from 'auth/AuthContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { Organization } from '@/lib/models/organizations/organization';
import { useGetBounties } from '@/hooks/bountyHooks';
import { BountyState } from '@/lib/models/status';
import {
  Order,
  BountyOrderBy,
  BountyQueryParams,
} from '@/lib/models/queryParams';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { TargetType } from '@/lib/models/targetType';
import Loading from '@/components/utils/Loading';
import { AppearVariants } from '@/lib/framer/Variants';
import { PageControls } from '../../components/pages/search/PageControls';
import { SearchFilters } from '../../components/pages/search/SearchFilters';
import { DarkOverlay } from '@/components/navbar/utils/DarkOverlay';
import { useUrlSearchParams } from '@/hooks/useUrlSearchParams';

const PAGE_SIZE = 10;

const SearchPage: NextPageWithLayout = () => {
  const { userId, LogIn } = useAuth();

  const { searchParams: query, applyQry: setQuery } = useUrlSearchParams();

  const {
    error,
    isLoading,
    bounties,
    hasNextPage,
    hasPreviousPage,
    currPage,
    count,
    numOfPages,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
    goToPage,
  } = useGetBounties(query, 0);

  const label = `${hasNextPage ? '+' : ''}${count ? count : '0'} ${
    bounties?.length === 1 ? 'bounty' : 'bounties'
  } found`;

  const [showFilters, setshowFilters] = useState(true);

  return (
    <>
      <Head>
        <title>ST | Search</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        setUp={{
          useMobileNavigation: true,
          rightButtonInfo: !userId
            ? [
                {
                  label: 'Connect wallet',
                  onClick: LogIn,
                  style: ButtonStyle.Hollow,
                },
                {
                  label: 'Filters',
                  onClick: () => setshowFilters(true),
                  style: ButtonStyle.Filled,
                  className: 'laptop:hidden qwerqwerqwe',
                },
              ]
            : [
                {
                  label: 'Filters',
                  onClick: () => setshowFilters(true),
                  style: ButtonStyle.Filled,
                  icon: 'sort',
                  className: 'laptop:hidden qwerqwerqwe',
                },
              ],
        }}
        className="px-2 max-w-5xl mx-auto space-y-4 laptop:space-y-16"
      >
        {/* Header */}
        <div className="space-y-4 max-w-5xl mx-auto">
          <Searchbar
            search={query.searchTerm || ''}
            setSearch={(e) => setQuery({ ...query, searchTerm: e })}
            className="grow"
          />
        </div>

        {/* search results */}
        <div className="laptop:grid grid-cols-7">
          {/* filters */}
          <aside className="z-40 col-span-2 flex gap-16 fixed inset-0 top-8 py-8 px-12 laptop:p-0 flex-col laptop:sticky laptop:top-32 h-fit w-full">
            <SearchFilters
              query={query}
              setQuery={setQuery}
              search={query.searchTerm || ''}
              showFilters={showFilters}
              setshowFilters={setshowFilters}
            />

            <DarkOverlay
              showOverlay={showFilters}
              setShowOverlay={setshowFilters}
              responsiveClasses="laptop:hidden"
            />
          </aside>

          <section className="space-y-2 laptop:space-y-8 col-span-5 col-start-3 laptop:pl-16">
            {/* Header */}
            <header className="flex w-full items-center justify-between">
              <Title title="Bounties" useBorder={true} />
              {!isLoading && (
                <div className="flex flex-col items-end">
                  <Button
                    info={{
                      style: ButtonStyle.TextPurple,
                      onClick: () => {},
                      label,
                      removeMinWidth: true,
                      removePadding: true,
                      disabled: true,
                    }}
                  />
                </div>
              )}
            </header>

            {/* Bounties */}
            {!isLoading && (
              <div className="space-y-6">
                {bounties?.map((p, i) => {
                  return (
                    <div className="laptop:flex" key={i}>
                      <span className="text-unactive text-sm font-bold laptop:-translate-x-6 h-fit">
                        {i + 1 + PAGE_SIZE * currPage}
                      </span>
                      <BountyEntry
                        bounty={p}
                        key={`${p.id} ${i}`}
                        className="w-full z-5"
                        variants={AppearVariants}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {isLoading && (
              <div className="py-16">
                <Loading fullScreen={false} />
              </div>
            )}

            {/* Page controls */}
            {!!bounties?.length && (
              <PageControls
                numOfPages={numOfPages}
                currPage={currPage}
                goToPage={goToPage}
                nextPage={fetchNextPage}
                prevPage={fetchPreviousPage}
                hasPreviousPage={hasPreviousPage}
                hasNextPage={hasNextPage}
                isFetching={isFetching}
                isLoading={isLoading}
              />
            )}
          </section>
        </div>

        {!!error && !isLoading && (
          <ImportantMessage
            message="There was an error."
            content={error as string}
            icon="warning"
          />
        )}
      </Navbar>
    </>
  );
};

export default SearchPage;

SearchPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

//TODO
function OrganizationSearchResults({
  isLoading,
  organizations,
}: {
  isLoading: boolean;
  organizations: Organization[];
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title title="Organizations" useBorder={false} />
        {!isLoading && (
          <p className="label text-disabled">
            {organizations ? organizations.length : '0'}{' '}
            {organizations?.length === 1 ? 'organization' : 'organizations'}{' '}
            found
          </p>
        )}
        {isLoading && (
          <span className="text-disabled label animate-pulse">Loading...</span>
        )}
      </div>

      {organizations?.map((org, i) => {
        return <OrgEntry org={org} key={i} />;
      })}
    </div>
  );
}
