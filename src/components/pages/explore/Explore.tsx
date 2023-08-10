import dynamic from 'next/dynamic';
import router from 'next/router';

import { MapDataWithFeatures } from '@/lib/models/MapData';
import { GoToBountiesPage } from '@/lib/utils/Routes';

import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';

import { BountyBoard } from './BountyBoard';
import { ExploreContextProvider, useExploreContext } from './ExploreContext';
import { ExploreFilters } from './filters/ExploreFilters';
import { PageControls } from './PageControls';
import { Section } from '../landing/Section';

const Map = dynamic(import('../stats/map/MapProjection'), {
  ssr: false,
});

export function Explore({ data }: { data: MapDataWithFeatures | undefined }) {
  return (
    <>
      <ExploreContextProvider data={data}>
        <ExploreContent />
      </ExploreContextProvider>
    </>
  );
}

function ExploreContent() {
  const { bountyFetch } = useExploreContext();

  const error = bountyFetch?.error ?? '';
  const { userId, isAuthenticated } = useAuth();

  if (error) {
    console.error(error);
    return <></>;
  }

  return (
    <>
      {/* <div className="mx-auto my-4 flex max-w-lg items-center justify-between space-x-4 border-b-2 border-surface p-2 rounded-xl">
        <div className="ml-2"> Checkout: </div>
        <Link href={GoToStatsPage()}>
          <span className="w-fit font-medium capitalize text-main-light hover:underline">
            Bounty Stats
          </span>
        </Link>
        <Link href={GoToTargetsPage()}>
          <span className="w-fit font-medium capitalize text-main-light hover:underline">
            Targets
          </span>
        </Link>
        <Link href={GoToOrganizationsPage()}>
          <span className="w-fit font-medium capitalize text-main-light hover:underline">
            Organisations
          </span>
        </Link>
      </div> */}
      <div>
        {/* <Section>{!!Map && <Map />}</Section> */}

        <div className="flex min-h-screen w-full flex-col gap-y-8 p-4">
          <>
            <Section className="w-full">
              {isAuthenticated && !!userId && <ExploreFilters />}
              {(!isAuthenticated || !userId) && (
                <ImportantMessage
                  className="mx-auto w-full max-w-xs p-2"
                  icon="info"
                  content={
                    <button
                      onClick={() =>
                        router.push(`${GoToBountiesPage()}?login=true`)
                      }
                      className="label mt-2"
                    >
                      <span className="underline">
                        Sign in to filter the bounties
                      </span>
                    </button>
                  }
                />
              )}
            </Section>
            <div className="space-y-8">
              <PageNumber />
              <BountyBoard />
            </div>
            <div className="flex grow basis-0 flex-wrap items-end justify-center">
              <PageControls />
            </div>
          </>
        </div>
      </div>
    </>
  );
}

function PageNumber() {
  const { bountyFetch } = useExploreContext();

  const lastPage = bountyFetch?.numOfPages;
  if (!lastPage) return <></>;

  return (
    <Section>
      <span className="label text-main-light">
        Page {(bountyFetch?.page ?? 0) + 1} of {lastPage}
      </span>
    </Section>
  );
}
