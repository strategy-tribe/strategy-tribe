import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MapData } from '@/lib/models/map/MapData';
import { GoTo404Page } from '@/lib/utils/Routes';

import Loading from '@/components/utils/Loading';

import { Section } from '../landing/Section';
import { PageControls } from '../search/PageControls';
import { BountyBoard } from './BountyBoard';
import { ExploreContextProvider, useExploreContext } from './ExploreContext';
import { ExploreFilters } from './filters/ExploreFilters';

const Map = dynamic(import('./map/MapProjection'), {
  ssr: false,
});

export function Explore({ data }: { data: MapData }) {
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
  const isLoading = bountyFetch?.isLoading ?? true;
  const bounties = bountyFetch?.bounties ?? [];
  const error = bountyFetch?.error ?? '';

  const router = useRouter();

  if (error) {
    router.push(GoTo404Page());
  }

  return (
    <>
      <div>
        {!!error && (
          <p className="w-full text-center text-error-light label">
            There has been an error.
            <br />
            {`${error}`}
          </p>
        )}

        {!error && (
          <>
            <Section>{!!Map && <Map />}</Section>

            <div className="space-y-8 min-h-screen">
              {!!bounties && (
                <>
                  <Section>
                    <ExploreFilters />
                  </Section>
                  <div className="space-y-8">
                    <PageNumber />
                    <BountyBoard />
                  </div>
                  <div className="flex justify-center">
                    <PageControls />
                  </div>
                </>
              )}
              {!!isLoading && <Loading small />}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function PageNumber() {
  const { bountyFetch } = useExploreContext();

  const lastPage = bountyFetch?.numOfPages ?? 0;

  return (
    <Section>
      <span className="label text-main-light">
        Page {(bountyFetch?.page ?? 0) + 1} of {lastPage}
      </span>
    </Section>
  );
}
