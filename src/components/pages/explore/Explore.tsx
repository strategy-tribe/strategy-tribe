import React from 'react';
import { Section } from '../landing/Section';
import { MapData } from '@/lib/models/map/MapData';
import { ExploreContextProvider } from './ExploreContext';

import dynamic from 'next/dynamic';
import {
  BountyQueryParams,
  Order,
  BountyOrderBy,
} from '@/lib/models/queryParams';
import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { BountyCard } from './bounty card/BountyCard';
const Map = dynamic(import('./map/MapProjection'), {
  ssr: false,
});

export function Explore({ mapData }: { mapData: MapData }) {
  const qLatest: BountyQueryParams = {
    order: Order.Asc,
    orderBy: BountyOrderBy.CreatedAt,
    amount: 15,
  };

  const { bounties, error } = useGetBounties(qLatest);

  if (!bounties) return <span>loading...</span>;

  if (error) return <span>{`${error}`}</span>;

  return (
    <>
      <ExploreContextProvider mapData={mapData}>
        <div className="space-y-20">
          <Section>
            <Map />
          </Section>

          <Section className={`grid grid-cols-4 gap-x-20 gap-y-10`}>
            {bounties?.map((bounty, i) => {
              return <BountyCard bounty={bounty} key={i} />;
            })}
          </Section>
        </div>
      </ExploreContextProvider>
    </>
  );
}
