import React, { useId } from 'react';
import { Bounty } from '@/lib/models';

export function BountyCardTags({ bounty }: { bounty: Bounty }) {
  return (
    <div className="flex gap-4 pb-2">
      {[bounty.organizationName, ...(bounty.tags || [])]?.map((tag) => (
        <Tag tag={tag} key={tag} />
      ))}
    </div>
  );
}

function Tag({ tag }: { tag: string }) {
  return (
    <button className="label-sm text-unactive text-left capitalize">
      {tag?.length > 14 ? `${tag.slice(0, 14)}...` : tag}
    </button>
  );
}
