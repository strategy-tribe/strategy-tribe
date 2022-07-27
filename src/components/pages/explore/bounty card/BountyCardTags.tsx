import React from 'react';
import { Bounty } from '@/lib/models';
import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';

export function BountyCardTags({ bounty }: { bounty: Bounty }) {
  const type = bounty.requirements.at(0)?.type || '';
  const org = bounty.organizationName;

  const { query, setQuery } = useUrlSearchParams();

  function addOrgToFilters() {
    setQuery({ ...query, orgName: org, specificityOfOrgName: 'Exact' });
  }

  return (
    <div className="flex gap-5 pb-2">
      <Tag tag={type} />
      <Tag tag={org} onClick={addOrgToFilters} />
    </div>
  );
}

function Tag({ tag, onClick }: { tag: string; onClick?: () => void }) {
  return (
    <button
      className="label-sm text-on-surface-unactive text-left capitalize"
      onClick={onClick}
    >
      {tag?.length > 14 ? `${tag.slice(0, 28)}...` : tag}
    </button>
  );
}
