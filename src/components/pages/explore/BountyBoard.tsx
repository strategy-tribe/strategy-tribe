import React from 'react';
import { Section } from '../landing/Section';
import { useExploreContext } from './ExploreContext';
import { BountyCard } from './bounty card/BountyCard';

export function BountyBoard() {
  const {
    bountyFetch: { bounties },
  } = useExploreContext();
  return (
    <Section className={`grid grid-cols-4 gap-x-20 gap-y-10`}>
      {bounties?.map((bounty, i) => {
        return <BountyCard bounty={bounty} key={i} />;
      })}
    </Section>
  );
}
