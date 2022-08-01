import { Stat } from '../../utils/Stat';
import { useBountyContext } from './BountyContext';

export function BountyMoreDetails() {
  const { bounty } = useBountyContext();

  return (
    <div className="space-y-4 -translate-x-4">
      {!!bounty.description && (
        <div className="px-4 pt-4  rounded">
          <span className="label-lg text-on-surface-unactive capitalize">
            More
          </span>

          <p className="whitespace-pre text-error-light font-medium">
            {bounty.description}
          </p>
        </div>
      )}

      <div className="p-4 space-y-8">
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
    </div>
  );
}
