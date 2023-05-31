import { useExploreUrl } from '@/components/pages/explore/useExploreUrl';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Loading from '@/components/utils/Loading';

import { BountyCard } from './bounty card/BountyCard';
import { useExploreContext } from './ExploreContext';
import { DEFAULT_FILTER } from './filters/utils/DefaultFilter';
import { Section } from '../landing/Section';

export function BountyBoard() {
  const { bountyFetch } = useExploreContext();

  const bounties = bountyFetch?.bounties;
  const isLoading = bountyFetch?.isLoading;

  const { setUrlFilter } = useExploreUrl();

  function resetFilters() {
    setUrlFilter({}, { type: DEFAULT_FILTER.type });
  }

  if (isLoading) return <Loading />;

  if (bounties?.length)
    return (
      <Section className="grid grid-cols-1 gap-x-10 gap-y-10 tablet:grid-cols-2 tablet:gap-x-16 bt:grid-cols-3">
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
