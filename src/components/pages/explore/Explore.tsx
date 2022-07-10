import React from 'react';
import { Section } from '../landing/Section';
import { ExploreContextProvider, useExploreContext } from './ExploreContext';
import dynamic from 'next/dynamic';
import Loading from '@/components/utils/Loading';
import { ExploreFilters } from './filters/ExploreFilters';
import { BountyBoard } from './BountyBoard';
import { MapData } from '@/lib/models/map/MapData';

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
  const {
    bountyFetch: { isLoading, bounties, error },
  } = useExploreContext();
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

          {!!bounties && <BountyBoard />}
          {!!isLoading && <Loading small />}
        </div>
      </div>
    </>
  );
}
