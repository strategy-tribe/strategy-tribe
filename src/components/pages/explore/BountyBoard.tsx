import React from 'react';
import { Section } from '../landing/Section';
import { useExploreContext } from './ExploreContext';
import { BountyCard } from './bounty card/BountyCard';
import Loading from '@/components/utils/Loading';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';
import { DEFAULT_FILTER } from './filters/DefaultFilter';

export function BountyBoard() {
  const {
    bountyFetch: { bounties, isPreviousData },
  } = useExploreContext();

  const { setQuery } = useUrlSearchParams();

  function resetFilters() {
    setQuery(DEFAULT_FILTER.query);
  }

  if (isPreviousData) return <Loading />;

  if (bounties?.length)
    return (
      <Section className={`grid grid-cols-4 gap-x-16 gap-y-10`}>
        {bounties?.map((bounty, i) => {
          return <BountyCard bounty={bounty} key={i} />;
        })}
      </Section>
    );
  else
    return (
      <Section className={`grid place-items-center space-y-2`}>
        <p className="text-center label">No results</p>
        <Button
          info={{
            label: 'Try resetting the filters',
            style: ButtonStyle.TextPurple,
            removePadding: true,
            onClick: resetFilters,
          }}
        />
      </Section>
    );
}
