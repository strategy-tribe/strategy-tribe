import React from 'react';
import { Section } from '../landing/Section';
import { ExploreContextProvider, useExploreContext } from './ExploreContext';
import dynamic from 'next/dynamic';
import Loading from '@/components/utils/Loading';
import { ExploreFilters } from './filters/ExploreFilters';
import { BountyBoard } from './BountyBoard';
import { MapData } from '@/lib/models/map/MapData';
import { PageControls } from '../search/PageControls';

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
  return (
    <>
      <div className="space-y-20">
        <Section>
          <Map />
        </Section>

        <div className="space-y-20 min-h-screen">
          {!!error && <span>{`${error}`}</span>}

          <Section>
            <ExploreFilters />
          </Section>

          {!!bounties && (
            <>
              <BountyBoard />
              <div className="flex  justify-center">
                <PageControls />
              </div>
            </>
          )}
          {!!isLoading && <Loading small />}
        </div>
      </div>
    </>
  );
}
