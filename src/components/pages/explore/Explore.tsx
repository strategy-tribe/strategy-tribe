import React from 'react';
import { Section } from '../landing/Section';
import { LatestBounties } from './LatestBounties';
import { LowCompetitionBounties } from './LowCompetition';
import { ClosesSoonBounties } from './ClosesSoonBounties';
import UserPrompts from './UserPrompts';
import { TopOrgBounties } from './TopOrgBounties';
import { TopIndidivualBounties } from './TopIndidivualBounties';
import { MapData } from '@/lib/models/map/MapData';
import { ExploreContextProvider } from './ExploreContext';

import dynamic from 'next/dynamic';
const Map = dynamic(import('./map/MapProjection'), {
  ssr: false,
});

export function Explore({ mapData }: { mapData: MapData }) {
  return (
    <>
      <ExploreContextProvider mapData={mapData}>
        <>
          <Section>
            <Map />
          </Section>

          <Section className="laptop:grid laptop:grid-cols-12 laptop:gap-x-16 space-y-16 laptop:space-y-0">
            {/* main section */}
            <div className="w-full laptop:col-span-8 space-y-16 laptop:space-y-24">
              <LowCompetitionBounties />
              <ClosesSoonBounties />
              <LatestBounties />
            </div>

            {/* aside */}
            <aside className="w-full col-span-4 space-y-16">
              <UserPrompts />
              <TopIndidivualBounties />
              <TopOrgBounties />
            </aside>
          </Section>
        </>
      </ExploreContextProvider>
    </>
  );
}
