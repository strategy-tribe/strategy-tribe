import { Bounty as BountyData } from '@/lib/models';
import { Stat } from '../submission/Stat';
import { useBountyContext } from './BountyContext';

export function BountyMoreDetails() {
  const { bounty } = useBountyContext();

  return (
    <div className="space-y-8">
      {!!bounty.description && (
        <Stat title="Description" content={bounty.description} />
      )}

      <Stat title="Bounty ID" content={bounty.id} copyable />
      <Stat title="Funds address" content={bounty.wallet} copyable />

      <Stat
        title="Additional info"
        contents={bounty.requirements
          .filter((r) => r.optional)
          .map((r) => r.title)}
      />

      <Stat title="Tags" contents={bounty.tags} />
      <Stat title="Regions" contents={bounty.countries} />
      {!!bounty.alsoKnownAs && (
        <Stat title="Also known as" contents={bounty.alsoKnownAs} />
      )}
    </div>
  );
}
