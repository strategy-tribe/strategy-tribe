import React from 'react';
import { Section } from '../landing/Section';
import { useExploreContext } from './ExploreContext';
import { BountyCard } from './bounty card/BountyCard';
import Loading from '@/components/utils/Loading';

export function BountyBoard() {
  const {
    bountyFetch: { bounties, isPreviousData },
  } = useExploreContext();

  if (isPreviousData) return <Loading />;
  return (
    <Section className={`grid grid-cols-4 gap-x-16 gap-y-10`}>
      {bounties?.map((bounty, i) => {
        return <BountyCard bounty={bounty} key={i} />;
      })}
    </Section>
  );
}
