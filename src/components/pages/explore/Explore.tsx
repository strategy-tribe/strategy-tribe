import React from 'react';
import { Section } from '../landing/Section';
import { ExploreContextProvider, useExploreContext } from './ExploreContext';
import dynamic from 'next/dynamic';
import Loading from '@/components/utils/Loading';
import { ExploreFilters } from './filters/ExploreFilters';
import { BountyBoard } from './BountyBoard';
import { MapData } from '@/lib/models/map/MapData';
import { PageControls } from '../search/PageControls';
import { useRouter } from 'next/router';
import { GoTo404Page } from '@/lib/utils/Routes';

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
  const { isLoading, bounties, error } = bountyFetch;

  const router = useRouter();

  if (error) {
    router.push(GoTo404Page());
  }

  return (
    <>
      <div>
        {!!error && (
          <p className="w-full text-center text-redLight label">
            There has been an error.
            <br />
            {`${error}`}
          </p>
        )}

        {!error && (
          <>
            <Section>{!!Map && <Map />}</Section>

            <div className="space-y-12 min-h-screen">
              {!!bounties && (
                <>
                  <Section>
                    <ExploreFilters />
                  </Section>
                  <BountyBoard />
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
