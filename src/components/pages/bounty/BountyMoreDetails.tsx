import { Stat } from '@/components/utils/Stat';

import { useBountyContext } from './BountyContext';

export function BountyMoreDetails() {
  const { bounty } = useBountyContext();

  return (
    <div className="-translate-x-4 space-y-4">
      {!!bounty.description && (
        <div className="rounded px-4 pt-4">
          <span className="label-lg capitalize text-on-surface-unactive">
            More
          </span>

          <p className="whitespace-pre font-medium text-error-light">
            {bounty.description}
          </p>
        </div>
      )}

      <div className="space-y-8 p-4">
        <Stat title="Bounty Slug" content={bounty.slug} copyable />
        <Stat
          title="Funds address"
          content={bounty.wallet.address}
          copyable
          size="break-all"
        />

        <Stat
          title="Additional info"
          contents={bounty.requirements
            ?.filter((r) => r.optional)
            .map((r) => r.title)}
        />

        <Stat title="Tags" contents={bounty.tags?.map((t) => t.name)} />
        <Stat
          title="Regions"
          contents={bounty.target?.org?.countries?.map((c) => c.name)}
        />
        {!!bounty.target?.alsoKnownAs && (
          <Stat title="Also known as" contents={bounty.target.alsoKnownAs} />
        )}
      </div>
    </div>
  );
}
