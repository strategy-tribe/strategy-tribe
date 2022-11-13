import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';

import { Button, ButtonStyle } from '@/components/utils/Button';
import Loading from '@/components/utils/Loading';

import { Section } from '../landing/Section';
import { BountyCard } from './bounty card/BountyCard';
import { useExploreContext } from './ExploreContext';
import { DEFAULT_FILTER } from './filters/DefaultFilter';

export function BountyBoard() {
  const { bountyFetch } = useExploreContext();

  const bounties = bountyFetch?.bounties;
  const isLoading = bountyFetch?.isLoading;

  const { setUrlFilter } = useUrlSearchParams();

  function resetFilters() {
    setUrlFilter({}, { type: DEFAULT_FILTER.type });
  }

  if (isLoading) return <Loading />;

  if (bounties?.length)
    return (
      <Section className="grid grid-cols-4 gap-x-16 gap-y-10">
        {bounties?.map((bounty, i) => {
          return <BountyCard bounty={bounty} key={i} />;
        })}
      </Section>
    );
  else
    return (
      <Section className="grid place-items-center space-y-2">
        <p className="label text-center">No results</p>
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
