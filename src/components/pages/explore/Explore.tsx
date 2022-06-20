import { Map } from './map/Map';
import Navbar from '@/components/navbar/Navbar';
import { ButtonStyle } from '@/components/utils/Button';
import { useAuth } from 'auth/AuthContext';
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

export function Explore({ mapData }: { mapData: MapData }) {
  const { userId, LogIn } = useAuth();
  return (
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
            ]
          : undefined,
      }}
      className="space-y-8"
    >
      <ExploreContextProvider mapData={mapData}>
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
      </ExploreContextProvider>
    </Navbar>
  );
}
